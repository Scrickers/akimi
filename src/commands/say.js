"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");

class say extends Command {
  constructor(client) {
    super(client, {
      name: "say",
      description: "Faites dire ce que vous voulez au Bot.",
      category: ":gear:️ Bot",
      usage: "say",
      aliases: []
    });
  }

  async run(message, args) {
    const client = this.client;
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      message.delete(15000);
      const errEmbed = new Discord.RichEmbed()
        .setAuthor("ERREUR")
        .setTitle("❗ Tu n'as pas la permission.")
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({ embed: errEmbed }).then((message) => {
        message.delete(15000);
      });
      return;
    }
    const botmessage = args.join(" ");
    if (!botmessage) {
      message.delete(15000);
      const errEmbed = new Discord.RichEmbed()
        .setAuthor("ERREUR")
        .setTitle("❗ Indiquer un message.")
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({ embed: errEmbed }).then((message) => {
        message.delete(15000);
      });
      return;
    }
    message.delete().catch();
    message.channel.send(botmessage);
  }
}

module.exports = say;
