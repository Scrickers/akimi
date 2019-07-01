"use strict";

const Command = require("../structures/Command");

class Lyrics extends Command {
  constructor(client) {
    super(client, {
      name: "lyrics",
      description: "Rechercher les paroles d'une chanson.",
      category: ":musical_note: Musique",
      usage: "lyrics <Nom de chanson>",
      aliases: []
    });
  }

  async run(message, args) {
    const search = args.join(" ");
    if (!search) {
      return this.client.music.sendEmbed(
        message,
        "⚠ Donnez-moi un nom de chanson à rechercher !"
      );
    }
    await this.client.music.searchLyrics(message, search);
  }
}

module.exports = Lyrics;
