"use strict";
const Command = require("../structures/Command");

class setdm extends Command {
  constructor(client) {
    super(client, {
      name: "setdm",
      description: "Modifie le message de bienvenue par dm par defaut.",
      category: ":pencil: config",
      usage: "setdm <message>",
      aliases: []
    });
  }

  async run(message, args) {
    const newprefix = args.join(" ").trim();
    const prefixes = this.client.setting.get(`${message.guild.id}`, "prefix");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "Vous n'êtes pas autorisé à définir le message de bienvenue par dm du serveur."
      );
    if (!args.join(" ") && args.join(" ").toUpperCase() !== "NONE")
      return message.channel.send(
        `**spécifier un message a envoyer au nouveau utilisateur**\n > *${prefixes}setdm message*.`
      );
    this.client.setting.set(`${message.guild.id}`, newprefix, "messsagedm");
    message.channel.send(
      `**Le texte de bienvenue par dm a été mis à jour avec succès :**\n **=>** ${this.client.setting.get(
        `${message.guild.id}`,
        "messsagedm"
      )}.`
    );
  }
}

module.exports = setdm;
