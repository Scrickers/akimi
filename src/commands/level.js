"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");

class bot extends Command {
  constructor(client) {
    super(client, {
      name: "level",
      description:
        "Renvoie le niveau et les points d'expérience de l'utilisateur.",

      category: ":yum: Utilisateur",
      usage: "level",
      aliases: ["lvl"]
    });
  }

  run(message) {
    const client = this.client;
    var ball_embed = new Discord.RichEmbed()
      .setColor(0x36393f)
      .setTitle("level")
      .addField(
        "points d'expérience,",
        `${this.client.points.get(
          `${message.guild.id}-${message.author.id}`,
          "points"
        )}`,
        true
      )
      .addField(
        "niveau",
        `${this.client.points.get(
          `${message.guild.id}-${message.author.id}`,
          "level"
        )}`,
        true
      )
      .setTimestamp(new Date())
      .setFooter(client.user.username, client.user.avatarURL);
    message.channel.send(ball_embed);
  }
}

module.exports = bot;
