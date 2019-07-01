"use strict"; 
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const config = require("./configs");
const LOGGER = require("./src/utils/logger");
const MUSIC = require("./src/utils/music");
class Akimi extends Discord.Client {
  constructor() {
    super();
    this.commands = new Discord.Collection();
    this.AkimiAPI = require("./src/structures/akimiApi")
    this.aliases = new Discord.Collection();
    this.config = config;
    this.website = require("./website/dashboard");
    this.logger = new LOGGER(this);
    this.music = new MUSIC(this);
    this.points = new Enmap({
      name: "points",
      cloneLevel: "deep",
      fetchAll: true,
      autoFetch: true
    });
    this.setting = new Enmap({
      name: "setting",
      cloneLevel: "deep",
      fetchAll: false,
      autoFetch: true
    });
    this.afk = new Enmap({
      name: "afk",
      cloneLevel: "deep",
      fetchAll: true,
      autoFetch: true
    });
  }
}

const client = new Akimi();

fs.readdir("./src/commands", (err, files) => {
  if (err) {
    throw err;
  }
  if (files.length < 0) {
    return client.logger.warn("Probleme | Aucune commande trouvée !");
  }

  const commands = files.filter((c) => c.split(".").pop() === "js");

  for (let i = 0; i < commands.length; i++) {
    if (!commands.length) {
      return client.logger.warn("Probleme | Aucune commande trouvée !");
    }
    const FILE = require(`./src/commands/${commands[i]}`);
    const command = new FILE(client);

    client.commands.set(command.name, command);
    if (command && command.aliases) {
      for (let i = 0; i < command.aliases.length; i++) {
        client.aliases.set(command.aliases[i], command);
      }
    }
  }
});

fs.readdir("./src/events", (err, files) => {
  if (err) {
    throw err;
  }
  if (files.length < 0) {
    return client.logger.warn("Probleme | Aucun event trouvée !");
  }

  const events = files.filter((c) => c.split(".").pop() === "js");

  for (let i = 0; i < events.length; i++) {
    if (!events.length) {
      return client.logger.warn("Probleme | Aucun event trouvée !");
    }
    const FILE = require(`./src/events/${events[i]}`);
    const event = new FILE(client);
    client.on(events[i].split(".")[0], (args) => event.run(args));
  }
});

process.on("unhandledRejection", (err) => {
  client.logger.error(err);
});


const DBL = require("dblapi.js");
const dbl = new DBL(process.env.discordbots, client);

dbl.on("posted", () => {
  console.log("Server count posted!");
});

dbl.on("error", e => {
  console.log(`Oops! ${e}`);
});

const { ddblAPI } = require("ddblapi.js");

const ddbl = new ddblAPI(config.BOT_ID, process.env.divinediscordbots);

ddbl.postStats(93).then(console.log);

client.login(config.BOT_TOKEN);