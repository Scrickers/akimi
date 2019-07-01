"use strict";

const Command = require("../structures/Command");
var math = require("mathjs");
const Discord = require("discord.js");

class maths extends Command {
  constructor(client) {
    super(client, {
      name: "math",
      description: "Résout une équation.",
      category: ":gear:️ Bot",
      usage: "math <équation>",
      aliases: []
    });
  }

  run(message, args) {
    const client = this.client;
    const input = args.join(" ");
    if (!input) {
      message.reply(
        "__Vous devez fournir une équation à résoudre sur la calculatrice!__"
      );
      return;
    }

    const question = args.join(" ");

    let answer;
    try {
      answer = math.eval(question);
    } catch (err) {
      return message.reply(`**Erreur:** ${err}`);
    }

    const embed = new Discord.RichEmbed()
      .setThumbnail(
        "https://images-na.ssl-images-amazon.com/images/I/31QYTepQomL.png"
      )
      .addField("**Question:**", question, true)
      .addField("**reponses:**", answer)
      .setColor(0x36393f)
      .setTimestamp(new Date())
      .setFooter(client.user.username, client.user.avatarURL);

    message.channel.send({
      embed
    });
  }
}
module.exports = maths;
