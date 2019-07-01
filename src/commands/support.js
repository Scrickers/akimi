"use strict";

const Command = require("../structures/Command");

class support extends Command {
  constructor(client) {
    super(client, {
      name: "support",
      description: "Envoie l'invitation pour rejoindre le serveur de support.",
      category: ":gear:️ Bot",
      usage: "support",
      aliases: []
    });
  }

  async run(message) {
    const client = this.client;
    await client.music.sendEmbed(
      message,
      "Pour rejoindre le serveur de support, [cliquez-ici.](https://discord.gg/vkyS7uu)"
    );
  }
}

module.exports = support;
