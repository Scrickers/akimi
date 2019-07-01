"use strict";

const Command = require("../structures/Command");

class bug extends Command {
  constructor(client) {
    super(client, {
      name: "bug",
      description: "Signale un bug au développeur du Bot.",
      category: ":gear:️ Bot",
      usage: "bug <bug>",
      aliases: []
    });
  }

  async run(message, args) {
    const client = this.client;

    const prefixes = this.client.setting.get(`${message.guild.id}`, "prefix")
    if (!args[0])
      return message.reply(
        `S'il vous plaît spécifier le bug. Exemple: \n <<${prefixes}ban ne fonctionne pas. Il ne ban pas l'utilisateur que j'ai mentionné.>>`
      );
    args = args.join(" ");
    message.reply("Merci de nous avoir signaler un bug!");
    const content = `**${message.author.username}#${
      message.author.discriminator
      }** (${
      message.author.id
      }) reported:\n~~--------------------------------~~\n${args}\n~~--------------------------------~~\nOn the server: **${
      message.guild.name
      }**\nServer ID: **${message.guild.id}**`;
    client.users.get("328892873699360772").send(content);
  }
}

module.exports = bug;
