"use strict";

const Command = require("../structures/Command");

class Moveto extends Command {
  constructor(client) {
    super(client, {
      name: "moveto",
      description: "Changer le bot de salon vocal.",
      category: ":musical_note: Musique",
      usage: "moveto <ID du salon>",
      aliases: []
    });
  }

  async run(message, args) {
    const client = this.client;
    const search = args.slice(1).join(" ");
    if (!search) {
      return client.music.sendEmbed(
        message,
        `⚠ Donnez-moi l'ID d'un salon vocal ! L'utilisation correcte est: ${
          client.config.PREFIX
        }moveto <\`ID\` du salon>`
      );
    }
    await client.music.moveTo(message, search);
  }
}

module.exports = Moveto;
