"use strict";

const Command = require("../structures/Command");
class Leave extends Command {
  constructor(client) {
    super(client, {
      name: "leave",
      description: "Fait sortir le bot du salon-vocal.",
      category: ":musical_note: Musique",
      usage: "leave",
      aliases: []
    });
  }

  async run(message) {
    if (!message.member.voiceChannel) {
      return this.client.music.sendEmbed(
        message,
        "⚠ Vous devez être connecté dans un salon-vocal !"
      );
    }
    const queue = this.client.music.getQueue(message.guild.id);

    await message.member.voiceChannel.leave();
    await this.client.music.sendEmbed(
      message,
      "Je suis bien sortie du salon-vocal à votre demande ! ✅"
    );
    if (queue.length === 0) {
      return;
    }
    for (var i = queue.length - 1; i >= 0; i--) {
      queue.splice(i, 1);
    }
  }
}

module.exports = Leave;
