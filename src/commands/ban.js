"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");

class ban extends Command {
  constructor(client) {
    super(client, {
      name: "ban",
      description: "Ban un utilisateur.",
      category: ":name_badge: Modération",
      usage: "ban <utilisateur> [raison]",
      aliases: []
    });
  }

  async run(message, args) {
    const client = this.client;
    args = args.join(" ");
    message.delete(message.author);
    const bannedUser = message.mentions.users.first();
    if (!bannedUser) {
      message.delete(15000);
      const errEmbed = new Discord.RichEmbed()
        .setAuthor("Erreur")
        .setTitle("❗ Vous devez mentionner un utilisateur.")
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({ embed: errEmbed }).then((msg) => {
        msg.delete(15000);
      });
      return;
    }
    let banRaison = args.join(" ").slice(22);
    if (!banRaison) banRaison = "Aucune raison n'a été donnée.";
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      message.delete(15000);
      const errEmbed = new Discord.RichEmbed()
        .setAuthor("Erreur")
        .setTitle("❗ Vous n'avez pas la permission.")
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({ embed: errEmbed }).then((msg) => {
        msg.delete(15000);
      });
      return;
    }
    if (bannedUser.hasPermission("MANAGE_MESSAGES")) {
      message.delete(15000);
      const errEmbed = new Discord.RichEmbed()
        .setAuthor("Erreur")
        .setTitle("⚠️Vous ne pouvez pas bannir cet utilisateur⚠️")
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({ embed: errEmbed }).then((msg) => {
        msg.delete(15000);
      });
      return;
    }

    const banEmbed = new Discord.RichEmbed()
      .setDescription("Ban")
      .addField("Utilisateur banni", `${bannedUser} (ID: ${bannedUser.id})`)
      .addField("Banni par", `${message.author} (ID: ${message.author.id})`)
      .addField("salons", message.channel)
      .addField("Raison", banRaison)
      .setColor(0x36393f)
      .setTimestamp(new Date())
      .setFooter(client.user.username, client.user.avatarURL);

    const banChannel = this.client.setting.get(`${message.guild.id}`, "log");
    if (!banChannel) {
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

    message.delete();
    message.guild.member(bannedUser).ban(banRaison);
    banChannel.send(banEmbed);
    message.channel.send("🚨 L'utilisateur a été banni du serveur 🚨");
  }
}

module.exports = ban;
