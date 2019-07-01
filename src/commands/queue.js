"use strict";

const Command = require("../structures/Command");

class Queue extends Command {
  constructor(client) {
    super(client, {
      name: "queue",
      description: "Voit la file d'attente des musiques du serveur.",
      category: ":musical_note: Musique",
      usage: "queue",
      aliases: []
    });
  }

  async run(message) {
    const queue = this.client.music.getQueue(message.guild.id);
    if (queue.length <= 1) {
      return this.client.music.sendEmbed(
        message,
        "⚠ Il n'y a pas de musique dans la queue !"
      );
    }

    let text = "";
    for (let i = 1; i < queue.length; i++) {
      text += `${i}. ${queue[i].title}\n`;
    }
    if (text.length > 1900) {
      text = text.substr(0, 1900);
      text = text + "...";
    }
    await this.client.music.sendEmbed(
      message,
      `📝 Voici la queue du serveur:\n\`\`\`${text}\`\`\``
    );
  }
}

module.exports = Queue;
