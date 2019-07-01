"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");

class ball extends Command {
  constructor(client) {
    super(client, {
      name: "8ball",
      description: "Réponds à une question dichotomique.",
      category: ":tada: Fun",
      usage: "8ball <question>",
      aliases: []
    });
  }

  async run(message) {
    const client = this.client;
    const réponse = [
      "Bien sûr !",

      "Je ne sais pas.",

      "Peut être.",

      "Je pense pas.",

      "Impossible !!",

      "Je ne comprends pas.",

      "Pourquoi pas.",

      "Pouvez-vous répéter votre question? :angel:",

      "Bonne idée.",

      "Je ne veux pas te répondre.",

      "Oui.",

      "Non.",

      "Negatif",

      "Je pense que non",

      "je tes jamais aimé",

      "...."
    ];

    const args = message.content
      .split(" ")
      .join(" ")
      .slice(6);

    if (!args) {
      const ball_embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField("Erreur", "Vous devez poser une question.");
      message.channel.send(ball_embed);
    }
    var ball_embed = new Discord.RichEmbed()
      .setColor(0x36393f)
      .setTitle("8Ball")
      .addField("Questions", `${args}`)
      .addField("réponse", réponse[Math.round(Math.random() * réponse.length)])
      .setTimestamp(new Date())
      .setFooter(client.user.username, client.user.avatarURL);
    message.channel.send(ball_embed);
  }
}
module.exports = ball;
