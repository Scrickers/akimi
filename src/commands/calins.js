"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");
const superagent = require("superagent");

class calins extends Command {
  constructor(client) {
    super(client, {
      name: "calins",
      description: "Fait un câlin à un utilisateur.",
      category: ":tada: Fun",
      usage: "*calins <utilisateur>",
      aliases: ["calin"]
    });
  }
  async run(message, args) {
    const client = this.client;
    const hugUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.get(args[0])
    );
    if (!hugUser) {
      message.delete(15000);
      const errEmbed = new Discord.RichEmbed()
        .setColor(0xff0000)
        .setAuthor("ERREUR")
        .setTitle(":x: L'utilisateur n'a pas été trouver.");
      message.channel.send({ embed: errEmbed }).then((msg) => {
        msg.delete(15000);
      });
      return;
    }
    const { body } = await superagent.get("https://nekos.life/api/v2/img/hug");

    message.delete(3600000);
    const hugEmbed = new Discord.RichEmbed()
      .setTitle("Câlins! c:")
      .setDescription(
        `**${message.author.username}** fait un câlin à **${hugUser}**!`
      )
      .setImage(body.url)
      .setColor(0x36393f)
      .setTimestamp(new Date())
      .setFooter(client.user.username, client.user.avatarURL);

    message.channel.send(hugEmbed).then((msg) => {
      msg.delete(3600000);
    });
  }
}

module.exports = calins;
