"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");
let i;

class clear extends Command {
  constructor(client) {
    super(client, {
      name: "clear",
      description: "Supprime des messages.",
      category: ":name_badge: Modération",
      usage: "clear <nombre>",
      aliases: ["purge"]
    });
  }

  async run(message, args) {
    const client = this.client;
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      message.delete(15000);
      const errEmbed = new Discord.RichEmbed()
        .setAuthor("ERREUR")
        .setTitle("❗ vous n'aviez pas la permission.")
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({ embed: errEmbed }).then(msg => {
        msg.delete(15000);
      });
      return;
    }

    if (!args[0]) {
      message.delete(15000);
      const errEmbed = new Discord.RichEmbed()
        .setAuthor("ERREUR")
        .setTitle("❗ Indiquer un nombre.")
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({ embed: errEmbed }).then(msg => {
        msg.delete(15000);
      });
      return;
    }

    if (args[0] > 100) {
      message.delete(15000);
      const errEmbed = new Discord.RichEmbed()
        .setAuthor("ERREUR")
        .setTitle("❗ La limite de discord est mie à 100.")
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({ embed: errEmbed }).then(msg => {
        msg.delete(15000);
      });
      return;
    }
    if (args[0] > 0 && args[0] < 101) {
      message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`${args[0]} messages supprimés!`);
      });
    }
  }
}

module.exports = clear;
