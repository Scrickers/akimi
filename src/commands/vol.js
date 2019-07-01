"use strict";

const Command = require("../structures/Command");

class Volume extends Command {
  constructor(client) {
    super(client, {
      name: "volume",
      description: "Changer le volume du bot.",
      category: ":musical_note: Musique",
      usage: "volume <Nombre>",
      aliases: ["vol"]
    });
  }

  async run(message, args) {
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
    } else if (
      !message.guild.voiceConnection.player.dispatcher ||
      message.guild.voiceConnection.player.dispatcher.paused
    ) {
      return client.music.sendEmbed(message, "⚠ Je ne joue actuellement pas !");
    }
    const volume = args.join(" ");
    if (!volume) {
      return client.music.sendEmbed(
        message,
        "⚠ Donnez-moi un nombre pour changer le volume !"
      );
    }
    await client.music.changeVolume(message, volume);
  }
}

module.exports = Volume;
