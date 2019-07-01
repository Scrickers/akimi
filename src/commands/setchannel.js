"use strict";
const Command = require("../structures/Command");

class setchannel extends Command {
  constructor(client) {
    super(client, {
      name: "setchannel",
      description: "Modifie le channel par defaut.",
      category: ":pencil: config",
      usage: "setchannel <channel>",
      aliases: []
    });
  }

  async run(message) {
    const prefixes = this.client.setting.get(`${message.guild.id}`, "prefix");
    const newprefix = message.mentions.channels.first().id;
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "Vous n'êtes pas autorisé à définir le channel de bienvenue du serveur du serveur."
      );
    if (!message.mentions.channels.first())
      return message.channel.send(
        `**Veuillez mentionner une chaîne**\n > *${prefixes}setChannel #channel*.`
      );
    this.client.setting.set(`${message.guild.id}`, newprefix, "channels");
    message.channel.send(
      `**Le canal de Bienvenue a été mis à jour avec succès :**\n **=>** ${this.client.setting.get(
        `${message.guild.id}`,
        "channels"
      )}.`
    );
  }
}

module.exports = setchannel;
