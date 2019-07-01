"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");

class sondage extends Command {
  constructor(client) {
    super(client, {
      name: "sondage",
      description: "Crée un sondage.",
      category: ":gear:️ Bot",
      usage: "sondage <texte>",
      aliases: []
    });
  }

  async run(message) {
    const client = this.client;
    const args = message.content.split(" ").slice(1);
    if (args.length > 231) {
      message.delete(15000);
      const errEmbed = new Discord.RichEmbed()
        .setAuthor("ERREUR")
        .setTitle("❗ Pour éviter les bugs la limite est mise à 231.")
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({ embed: errEmbed }).then((msg) => {
        msg.delete(15000);
      });
      return;
    }
    const sondage = args.join(" ");
    if (!sondage) {
      message.delete(15000);
      const errEmbed = new Discord.RichEmbed()
        .setAuthor("ERREUR")
        .setTitle("❗ Donnez le thème du sondage.")
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({ embed: errEmbed }).then((msg) => {
        msg.delete(15000);
      });
      return;
    }

    message.delete();
    var embed = new Discord.RichEmbed()
      .addField(sondage, "repondre avec :white_check_mark: ou :x:")
      .setColor(0x36393f)
      .setTimestamp(new Date())
      .setFooter(client.user.username, client.user.avatarURL);
    message.channel.sendEmbed(embed).then(function(message) {
      message.react("✅");
      message.react("❌");
    });
  }
}

module.exports = sondage;
