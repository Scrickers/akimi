"use strict";

const Command = require("../structures/Command");
const moment = require("moment");
class afk extends Command {
  constructor(client) {
    super(client, {
      name: "afk",
      description: "Active le mode afk.",
      category: ":gear:️ Bot",
      usage: "afk <Raisons>",
      aliases: ["setafk"]
    });
  }

  async run(message, args) {
    const key = `${message.guild.id}-${message.author.id}`;
    const afk = this.client.afk.get(key, "id");
    if (afk === message.author.id) {
      return message.channel.send("Vous êtes déjà en mode AFK.");
    } else {
      moment.locale("fr");
      args = args.join(" ");
      if (!args) {
        args = "Aucune raison donnée";
      }
      this.client.afk.set(key, args, "raison");
      this.client.afk.set(key, message.author.id, "id");
      this.client.afk.set(key, moment().add(2, 'hours').format("dddd ll à LT"), "date");
      message.channel.send(
        "vous avez bien été mis en mode AFK pour la raison suivante : **" +
          args +
          "**."
      );
    }
  }
}

module.exports = afk;
