"use strict";
const Command = require("../structures/Command");

class prefixs extends Command {
  constructor(client) {
    super(client, {
      name: "prefix",
      description: "Modifie le prefix par defaut.",
      category: ":pencil: config",
      usage: "prefix <prefix>",
      aliases: []
    });
  }

  async run(message, args) {
    const prefixes = this.client.setting.get(`${message.guild.id}`, "prefix");
    const newprefix = args.join(" ");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "Vous n'êtes pas autorisé à définir le nouveaux prefix."
      );
    if (!args[0])
      return message.channel.send(
        `**Spécifier un nouveau prefix.**\n > *${prefixes}prefix << nouveaux prefix>>*.`
      );

    this.client.setting.set(`${message.guild.id}`, newprefix, "prefix");
    message.channel.send(
      `**Le prefix a été mis à jour avec succès :**\n **=>** ${this.client.setting.get(`${message.guild.id}`, "prefix")}`
    );
  }
}

module.exports = prefixs;
