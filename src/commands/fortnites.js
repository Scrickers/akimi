"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");
const fortnites = require("fortnite");
class fortniter extends Command {
  constructor(client) {
    super(client, {
      name: "fortnite",
      description: "Donne les stats d'un compte Pc du jeu fortnite.",
      category: ":slot_machine: jeux",
      usage: "fortnite",
      aliases: []
    });
  }

  run(message, args) {
const fortnite = new fortnites(this.client.config.fkey);
    const client = this.client;
    message.delete();
    const filter = m => m.author.id === message.author.id;
    message.reply("Entrer ton nom sur fortnite").then(q => q.delete(15000));
    message.channel
      .awaitMessages(filter, {
        max: 1,
        time: 60000
      })
      .then(collected => {
        collected.delete(15000);
        if (
          collected.first().content === "cancel" ||
          collected.first().content === "annuler"
        ) {
          return message.reply("Annuler.");
        }

        const username = collected.first().content;

        fortnite
          .user(username, "pc")
          .then(data => {
            const embed = new Discord.RichEmbed()
              .setTitle(username)
              .setColor(0x36393f)
              .setDescription("Lifetime Stats")
              .addField("Top 3s", data.stats.lifetime[1]["Top 3s"], true)
              .addField("Top 5s", data.stats.lifetime[0]["Top 5s"], true)
              .addField("Wins", data.stats.lifetime[8]["Wins"], true)
              .addField("Win/Lose", data.stats.lifetime[9]["Win%"], true)
              .addField("Kills", data.stats.lifetime[10]["Kills"], true)
              .addField("K/D", data.stats.lifetime[11]["K/d"], true)
              .setTimestamp(new Date())
              .setFooter(client.user.username, client.user.avatarURL);
            return message.channel.send(embed);
          })
          .catch(err => {
            message.delete();
            message
              .reply("Le joueur n'a pas été trouver.")
              .then(r => r.delete(5000));
          });
      })
      .catch(err => {
        message.reply("Annuler...").then(r => r.delete(5000));
      });
  }
}

module.exports = fortniter;
