"use strict";
const Command = require("../structures/Command");

class setleave extends Command {
  constructor(client) {
    super(client, {
      name: "setleave",
      description: "Modifie le message de leave par defaut.",
      category: ":pencil: config",
      usage: "setleave <message>",
      aliases: []
    });
  }

  async run(message, args) {
    const newprefix = args.join(" ").trim();
    const prefixes = this.client.setting.get(`${message.guild.id}`, "prefix");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "Vous n'êtes pas autorisé à définir le message de leave du serveur."
      );
    if (!args.join(" ") && args.join(" ").toUpperCase() !== "NONE")
      return message.channel.send(
        `**spécifier un message de leave**\n > *${prefixes}setleave message*.`
      );
    this.client.setting.set(`${message.guild.id}`, newprefix, "messsageleave");
    message.channel.send(
      `**Le texte de leave a été mis à jour avec succès :**\n **=>** ${this.client.setting.get(
        `${message.guild.id}`,
        "messsageleave"
      )}.`
    );
  }
}

module.exports = setleave;
