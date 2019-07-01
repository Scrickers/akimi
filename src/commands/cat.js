"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");
const superagent = require("superagent");

class cat extends Command {
  constructor(client) {
    super(client, {
      name: "cat",
      description: "Affiche une image de chat.",
      category: ":tiger: Animaux",
      usage: "cat ",
      aliases: []
    });
  }

  async run(message) {
    const client = this.client;
    message.delete(3600000);
    const { body } = await superagent.get("https://aws.random.cat/meow");
    const dogembed = new Discord.RichEmbed()
      .setTitle("L'image ne s'affiche pas ? Clique ici :D")
      .setURL(body.file)
      .setImage(body.file)
      .setColor(0x36393f)
      .setTimestamp(new Date())
      .setFooter(client.user.username, client.user.avatarURL);
    message.channel.send(dogembed).then(msg => {
      msg.delete(3600000);
    });
  }
}

module.exports = cat;
