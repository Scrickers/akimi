"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");

class Suggestion extends Command {
  constructor(client) {
    super(client, {
      name: "suggestion",
      description: "Permets de nous suggérer des améliorations.",
      category: ":gear:️ Bot",
      usage: "Suggestion <Suggestion>",
      aliases: []
    });
  }

  async run(message, args) {
    const client = this.client;
    message.delete(message.author);
    const suggest = args.join(" ");
    const authormess = message.author;
    if (!suggest)
      return message.channel.send("Vous devez envoyé une suggestion.");
    if (suggest.length > 231) {
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
    var embed = new Discord.RichEmbed()
      .setTitle("Suggestion de " + authormess.tag)
      .addField(suggest, "Réagissez avec les réactions ci-dessous")
      .setColor(0x36393f)
      .setTimestamp(new Date())
      .setFooter(client.user.username, client.user.avatarURL);
    message.channel.send("☑️Suggestion envoyée☑️");
    client.channels
      .get("548081563154382848")
      .send(embed)
      .then(function(message) {
        message.react("✔");
        message.react("😐");
        message.react("❌");
      });
  }
}

module.exports = Suggestion;
