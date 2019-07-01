"use strict";

const Command = require("../structures/Command");

class Play extends Command {
  constructor(client) {
    super(client, {
      name: "play",
      description: "Jouer une musique.",
      category: ":musical_note: Musique",
      usage: "play <Titre de musique || Lien YouTube>",
      aliases: ["p"]
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
    }

    const search = args.join(" ");
    if (!search) {
      return client.music.sendEmbed(
        message,
        "⚠ Donnez-moi un nom de musique à chanter !"
      );
    }
    
      message.member.voiceChannel
        .join()
        .then(async connection => {
          await connection.sendVoiceStateUpdate({
            self_deaf: true
          });
          await client.music.searchSong(message, search);
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


module.exports = Play;
