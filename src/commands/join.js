"use strict";

const Command = require("../structures/Command");

class Join extends Command {
  constructor(client) {
    super(client, {
      name: "join",
      description: "Fait rejoindre le bot dans votre salon vocal.",
      category: ":musical_note: Musique",
      usage: "join",
      aliases: []
    });
  }

  async run(message) {
    const client = this.client;
    if (!message.member.voiceChannel) {
      return client.music.sendEmbed(
        message,
        "⚠ Vous devez être connecté dans un salon-vocal !"
      );
    } else if (!message.member.voiceChannel.joinable) {
      return client.music.sendEmbed(
        message,
        "⚠ Je n'ai pas la permission de `rejoindre` ou `parler` dans ce salon !"
      );
    } else if (!message.member.voiceChannel.speakable) {
      return client.music.sendEmbed(
        message,
        "⚠ Je n'ai pas la permission de `rejoindre` ou `parler` dans ce salon !"
      );
    }

    message.member.voiceChannel
      .join()
      .then(async connection => {
        await connection.sendVoiceStateUpdate({
          self_deaf: true
        });
        await client.music.sendEmbed(
          message,
          `✅ J'ai bien rejoins le salon **${message.member.voiceChannel.toString()}** !`
        );
      })
      .catch(err => {
        if (err) {
          return client.music.sendEmbed(
            message,
            "❌ Une erreur est survenue !"
          );
        }
      });
  }
}

module.exports = Join;
