"use strict";

const Command = require("../structures/Command");

class Shuffle extends Command {
  constructor(client) {
    super(client, {
      name: "shuffle",
      description: "Mélanger la file d'attente.",
      category: ":musical_note: Musique",
      usage: "shuffle",
      aliases: []
    });
  }

  async run(message) {
    if (!message.guild.voiceConnection) {
      return this.client.music.sendEmbed(
        message,
        "⚠ Je ne suis pas connecté dans un salon-vocal !"
      );
    } else if (!message.member.voiceChannel) {
      return this.client.music.sendEmbed(
        message,
        "⚠ Vous devez être connecté dans un salon-vocal !"
      );
    } else if (!message.member.voiceChannel.speakable) {
      return this.client.music.sendEmbed(
        message,
        "⚠ Je n'ai pas la permission de `rejoindre` ou `parler` dans ce salon !"
      );
    } else if (
      !message.guild.voiceConnection.player.dispatcher ||
      message.guild.voiceConnection.player.dispatcher.paused
    ) {
      return this.client.music.sendEmbed(
        message,
        ":point_up::skin-tone-3: Je ne joue actuellement pas."
      );
    }
    const queue = this.client.music.getQueue(message.guild.id);
    if (queue.length === 0) {
      return this.client.music.sendEmbed(
        message,
        "⚠ Il n'y a **aucune** musique dans la queue !"
      );
    }
    await this.client.music.shuffle(queue);
    await this.client.music.sendEmbed(
      message,
      "✅ La file d'attente a été mélangée !"
    );
  }
}

module.exports = Shuffle;
