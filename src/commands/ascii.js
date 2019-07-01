"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");
const figlet = require("figlet");
class ascii extends Command {
  constructor(client) {
    super(client, {
      name: "ascii",
      description: "Affiche un texte en ASCII.",
      category: ":tada: Fun",
      usage: "ascii <texte>",
      aliases: []
    });
  }

  async run(message, args) {
    const client = this.client;
    var content = args.join(" ");

    if (content.length > 14) {
      message.delete(15000);
      const errEmbed = new Discord.RichEmbed()
        .setAuthor("Erreur")
        .setTitle("❗ Pour éviter les bugs la limite est mise à 14.")
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({ embed: errEmbed }).then(msg => {
        msg.delete(15000);
      });
      return;
    }
    if (!content) {
      message.delete(15000);
      const errEmbed = new Discord.RichEmbed()
        .setAuthor("Erreur")
        .setTitle(
          "❗ Vous devez écrire un message pour que la commande marche bien."
        )
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({ embed: errEmbed }).then(msg => {
        msg.delete(15000);
      });
      return;
    }
    message.delete(3600000);
    figlet(content, function(err, text) {
      if (err) {
        console.log(err);
        return;
      }
      message.channel.send("```" + text + "```").then(msg => {
        msg.delete(3600000);
      });
    });
  }
}

module.exports = ascii;
