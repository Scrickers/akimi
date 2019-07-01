"use strict";
const Command = require("../structures/Command");

class setlogs extends Command {
  constructor(client) {
    super(client, {
      name: "setlogs",
      description: "Modifie le channel de logs par defaut.",
      category: ":pencil: config",
      usage: "setlogs <channel>",
      aliases: []
    });
  }

  async run(message) {
    const newlogs = message.mentions.channels.first().id;
    const prefixes = this.client.setting.get(`${message.guild.id}`, "prefix");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "Vous n'êtes pas autorisé à définir le channel de bienvenue du serveur du serveur."
      );
    if (!message.mentions.channels.first())
      return message.channel.send(
        `**Veuillez mentionner une chaîne**\n > *${prefixes}setlogs #channel*.`
      );
    this.client.setting.set(`${message.guild.id}`, newlogs, "log");

    message.channel.send(
      `**le channel logs a été mis à jour avec succès  :**\n  **${this.client.setting.get(
        `${message.guild.id}`,
        "log"
      )}.**`
    );
  }
}

module.exports = setlogs;
