"use strict";
const Command = require("../structures/Command");

class messsagewelcomes extends Command {
  constructor(client) {
    super(client, {
      name: "setwelcomes",
      description: "Modifie le message de bienvenue par defaut.",
      category: ":pencil: config",
      usage: "setwelcomes <message>",
      aliases: []
    });
  }

  async run(message, args) {
    const newprefix = args.join(" ").trim();
    const prefixes = this.client.setting.get(`${message.guild.id}`, "prefix");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "Vous n'êtes pas autorisé à définir le message de bienvenue du serveur."
      );
    if (!args.join(" ") && args.join(" ").toUpperCase() !== "NONE")
      return message.channel.send(
        `**spécifier un message de bienvenue a envoyer **\n > *${prefixes}setwelcome message*.`
      );
    this.client.setting.set(
      `${message.guild.id}`,
      newprefix,
      "messsagewelcomes"
    );
    message.channel.send(
      `**Le texte de bienvenue a été mis à jour avec succès :**\n **=>** ${this.client.setting.get(
        `${message.guild.id}`,
        "messsagewelcomes"
      )}.`
    );
  }
}

module.exports = messsagewelcomes;
