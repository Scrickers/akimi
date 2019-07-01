"use strict";

const Command = require("../structures/Command");

const Discord = require("discord.js");
class mybot extends Command {
  constructor(client) {
    super(client, {
      name: "mybot",
      description: "Crée un demandes d'invitation pour un bot.",
      category: ":gear:️ Bot",
      usage: "*mybot <id> <prefix>",
      aliases: ["mebot"]
    });
  }

  async run(message, args) {
    const client = this.client;
    if (isNaN(args[0])) {
      const prefixes = this.client.setting.get(`${message.guild.id}`, "prefix");
      message.delete(15000);
      const errEmbed = new Discord.RichEmbed()
        .setAuthor("Erreur")
        .setTitle(`Utilisation: ${prefixes}mybot [id] (prefix).`)
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({ embed: errEmbed }).then((msg) => {
        msg.delete(30000);
      });
      return;
    }
    message.delete();
    message.channel.send({
      embed: {
        author: {
          name: "Bots des élèves"
        },
        color: 53380,
        fields: [
          {
            name: "**nom :**",
            value: "<@" + args[0] + ">",
            inline: true
          },
          {
            name: "**prefix :**",
            value: args[1],
            inline: true
          },
          {
            name: "**lien :**",
            value:
              "https://discordapp.com/oauth2/authorize?client_id=" +
              args[0] +
              "&scope=bot&permissions=0",
            inline: true
          }
        ]
      }
    });
  }
}

module.exports = mybot;
