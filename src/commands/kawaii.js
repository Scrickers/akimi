"use strict";
const superagent = require("superagent");
const Command = require("../structures/Command");
const Discord = require("discord.js");

class kawaii extends Command {
  constructor(client) {
    super(client, {
      name: "kawaii",
      description: "Affiche une image kawaii.",
      category: ":frame_photo: Image",
      usage: "kawaii",
      aliases: ["kawai"]
    });
  }

  async run(message) {
    const client = this.client;
    const { body } = await superagent.get("https://nekos.life/api/v2/img/neko");
    const dogembed = new Discord.RichEmbed()
      .setTitle("L'image ne s'affiche pas ? Clique ici :D")
      .setURL(body.url)
      .setImage(body.url)
      .setColor(0x36393f)
      .setTimestamp(new Date())
      .setFooter(client.user.username, client.user.avatarURL);

    message.channel.send(dogembed);
  }
}

module.exports = kawaii;
