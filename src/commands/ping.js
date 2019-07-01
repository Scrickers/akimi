"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");
const talkedRecently = new Set();
let pinsg;
let pings;

class ping extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      description: "Donne la vitesse de connection du bot.",
      category: ":gear:️ Bot",
      usage: "ping",
      aliases: []
    });
  }

  async run(message) {
    const client = this.client;
    message.delete(message.author);
    if (talkedRecently.has(message.author.id)) {
      return message.channel.send(
        "Merci de patienter 5 secondes avant d'exécuter une nouvelle commande."
      );
    }
    if (
      new Date().getTime() - message.createdTimestamp >
      Math.round(client.ping)
    ) {
      pings = new Date().getTime() - message.createdTimestamp;
    } else {
      pings = Math.round(client.ping);
    }
    if (pings > 600) {
      pinsg = " le bot est lent.";
    } else {
      pinsg = "le bot est rapide.";
    }

    var embed = new Discord.RichEmbed()
      .setTitle("PING")
      .setDescription("Temps de réponse du bot")
      .addField(
        "🏓 PONG : Le **BOT** a mit: " +
          `[ **${new Date().getTime() - message.createdTimestamp}**` +
          " **Ms** ] pour répondre.\nEt l'**API** a mit: " +
          `[ **${Math.round(client.ping)}**` +
          " **Ms** ] pour répondre",
        `${pinsg}`
      )
      .setColor(0x36393f)
      .setTimestamp(new Date())
      .setFooter(client.user.username, client.user.avatarURL);
    message.channel.send(embed);
    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 5000);
  }
}

module.exports = ping;
