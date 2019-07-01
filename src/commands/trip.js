"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");
const superagent = require("superagent");

class tits extends Command {
  constructor(client) {
    super(client, {
      name: "trip",
      description: "Affiche une image nsfw \"trip\".",
      category: ":underage: Nsfw",
      usage: "trip",
      aliases: []
    });
  }

  async run(message) {
    const client = this.client;
    if (!message.channel.nsfw) {
      const errEmbed = new Discord.RichEmbed()
        .setAuthor("Erreur")
        .setTitle("❗ Utiliser cette commande dans un salon **nsfw**.")
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({ embed: errEmbed }).then((msg) => {
        msg.delete(15000);
      });
      return;
    }
    const { body } = await superagent.get("https://nekos.life/api/v2/img/tits");
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

module.exports = tits;
