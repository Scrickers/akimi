"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");

class avatar extends Command {
  constructor(client) {
    super(client, {
      name: "avatar",
      description: "Affiche l'avatar d'une personne.",
      category: ":gear:️ Bot",
      usage: "avatar",
      aliases: ["pdp"]
    });
  }

  async run(message, args) {
    const client = this.client;
    const usr = message.mentions.users.first();
    if (usr) {
      const dogembed = new Discord.RichEmbed()
        .setTitle(`L'avatar de ${usr.username} !`)
        .setImage(usr.avatarURL)
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send(dogembed);
    } else {
      message.channel.send(":x: L'utilisateur n'a pas été trouver.");
    }
  }
}

module.exports = avatar;
