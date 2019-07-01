"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");

class paypal extends Command {
  constructor(client) {
    super(client, {
      name: "paypal",
      description: "Fait un don d'argent au développer",
      category: ":gear:️ Bot",
      usage: "paypal ",
      aliases: []
    });
  }

  async run(message) {
    const client = this.client;

    var ball_embed = new Discord.RichEmbed()
      .setColor(0x36393f)
      .addField(
        "Paypal",
        "Notre bot est 100% gratuit et il est codé pour le plaisir d'aider et le plaisir de coder mais nous les développer on a besoin d'argent pour mettre le bot sur un hébergeur donc si vous vouliez nous aider faites un don en [cliquant ici.](https://www.paypal.me/ScrickerFr)"
      )
      .setTimestamp(new Date())
      .setFooter(client.user.username, client.user.avatarURL);
    message.channel.send(ball_embed);
  }
}
module.exports = paypal;
