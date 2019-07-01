"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");
const superagent = require("superagent");

class dog extends Command {
  constructor(client) {
    super(client, {
      name: "dog",
      description: "Affiche une image de dog.",
      category: ":tiger: Animaux",
      usage: "dog",
      aliases: []
    });
  }

  async run(message) {
    const client = this.client;
    message.delete(3600000);
    const { body } = await superagent.get("http://random.dog/woof.json");
    const dogembed = new Discord.RichEmbed()
      .setTitle("L'image ne s'affiche pas ? Clique ici :D")
      .setURL(body.url)
      .setImage(body.url)
      .setColor(0x36393f)
      .setTimestamp(new Date())
      .setFooter(client.user.username, client.user.avatarURL);
    message.channel.send(dogembed).then(msg => {
      msg.delete(3600000);
    });
  }
}

module.exports = dog;
