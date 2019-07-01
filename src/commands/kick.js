"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");

class kick extends Command {
  constructor(client) {
    super(client, {
      name: "kick",
      description: "Kick un utilisateur.",
      category: ":name_badge: Modération",
      usage: "kick <utilisateur> [raison]",
      aliases: []
    });
  }

  async run(message, args) {
    const client = this.client;

    args = args.join(" ");
    const kReason = args.slice(22);
    message.mentions.users.first();

    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      message.delete(15000);
      const errEmbed = new Discord.RichEmbed()
        .setAuthor("ERREUR")
        .setTitle("❗ Je n'ai pas la permission.")
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({ embed: errEmbed }).then((msg) => {
        msg.delete(15000);
      });

      return;
    }

    if (!kUser) {
      message.delete(15000);
      const errEmbed = new Discord.RichEmbed()
        .setAuthor("ERREUR")
        .setTitle("❗ Vous devez mentionner un utilisateur.")
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({ embed: errEmbed }).then((msg) => {
        msg.delete(15000);
      });
      return;
    }

    if (kUser.hasPermission("MANAGE_MESSAGES")) {
      message.delete(15000);
      const errEmbed = new Discord.RichEmbed()
        .setAuthor("ERREUR")
        .setTitle("❗ Je ne peux pas kick cette personne.")
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({ embed: errEmbed }).then((msg) => {
        msg.delete(15000);
      });
      return;
    }

    message.delete();
    const kickChannel = this.client.setting.get(`${message.guild.id}`, "log");
    if (!kickChannel) {
      const prefixes = this.client.setting.get(`${message.guild.id}`, "prefix");
      message.delete(15000);
      const errEmbed = new Discord.RichEmbed()
        .setAuthor("Erreur")
        .setTitle(
          `Le channel "logs" n'est pas défini utiliser la commande ${prefixes}setlog.`
        )
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({ embed: errEmbed }).then((msg) => {
        msg.delete(15000);
      });
      return;
    }
    let kickEmbed;
    if (kReason) {
      kickEmbed = new Discord.RichEmbed()
        .setDescription("~KICK~")
        .addField("personne Kick", `${kUser} ID: ${kUser.id}`)
        .addField(
          "Kickée par",
          `<@${message.author.id}> ID: ${message.author.id}`
        )
        .addField("raison", kReason)
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
    } else {
      kickEmbed = new Discord.RichEmbed()
        .setDescription("~KICK~")
        .addField("Personne Kick", `${kUser} ID: ${kUser.id}`)
        .addField(
          "Kickée par",
          `<@${message.author.id}> ID: ${message.author.id}`
        )
        .addField("raison", "Non défini.")
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
    }
    message.guild.member(kUser).kick();
    kickChannel.send(kickEmbed);
  }
}

module.exports = kick;
