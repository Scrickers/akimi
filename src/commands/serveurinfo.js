"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");
const moment = require("moment");

class serverinfos extends Command {
  constructor(client) {
    super(client, {
      name: "serverinfos",
      description: "Donnes des infos sur le serv.",
      category: ":gear:️ Bot",
      usage: "serverinfos",
      aliases: ["serv", "si", "servinfo"]
    });
  }

  async run(message) {
    const client = this.client;
    let role;
    function checkBots(guild) {
      let botCount = 0;
      guild.members.forEach((member) => {
        if (member.user.bot) botCount++;
      });
      return botCount;
    }

    function checkMembers(guild) {
      let memberCount = 0;
      guild.members.forEach((member) => {
        if (!member.user.bot) memberCount++;
      });
      return memberCount;
    }
    moment.locale("fr");

    message.delete();
    if (message.guild.roles.size > 30) {
      role = "Trop de rôle";
    } else {
      role = message.guild.roles.map((r) => r.name).join("  **=>**  ");
    }
    var embed = new Discord.RichEmbed()
      .setTitle("Serveur Info")
      .setAuthor(`${message.guild.name} - Informations`, message.guild.iconURL)
      .addField("Propriétaire du serveur", message.guild.owner.user.tag)
      .addField("Nom du serveur", message.guild.name)
      .addField(
        "Date de création",
        moment(message.guild.createdAt).format("Do MMMM YYYY, LTS")
      )
      .addField(
        ":1234: Nombre total de membres :1234:",
        message.guild.memberCount
      )
      .addField("Humains", checkMembers(message.guild), true)
      .addField("Bots", checkBots(message.guild), true)
      .addField("Nombre de salon", message.guild.channels.size)
      .addField("Nombre de rôles", message.guild.roles.size)
      .addField("Liste de rôles", `${role}`)
      .addField("Niveau de vérification", message.guild.verificationLevel, true)
      .setColor(0x36393f)
      .setTimestamp(new Date())
      .setFooter(client.user.username, client.user.avatarURL);
    message.channel.send(embed);
  }
}

module.exports = serverinfos;
