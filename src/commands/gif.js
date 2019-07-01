"use strict";

const Command = require("../structures/Command");
const gifSearch = require("gif-search");
const Discord = require("discord.js");

class gif extends Command {
  constructor(client) {
    super(client, {
      name: "gif",
      description: "Recherche un gif.",
      category: ":tada: Fun",
      usage: "gif <recherche>",
      aliases: []
    });
  }

  async run(message, args) {
    const client = this.client;
    args = args.join(" ");
    if (!args) message.channel.send("Vous deviez spécifier votre recherche !");
    gifSearch.random(args).then(gifUrl => {
      var embed = new Discord.RichEmbed()
        .setImage(gifUrl)
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send(embed);
    });
  }
}

module.exports = gif;
