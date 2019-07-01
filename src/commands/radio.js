"use strict";

const Command = require("../structures/Command");
const radio = require("../utils/radio.js");
class radioo extends Command {
  constructor(client) {
    super(client, {
      name: "radio",
      description: "Jouer une radio.",
      category: ":musical_note: Musique",
      usage: "radio <chiffre>",
      aliases: ["rplay", "rp"]
    });
  }

  async run(message, args) {
    if (args[0] === undefined) {
      radio.playRadio(
        message.member.voiceChannel,
        message,
        "top music",
        "http://str0.creacast.com/topmusic1"
      );
    }

    if (args[0] === "1") {
      radio.playRadio(
        message.member.voiceChannel,
        message,
        "skyrock",
        "http://icecast.skyrock.net/s/natio_mp3_128k?tvr_name=radiofr&tvr_section1=128mp3"
      );
    }

    // I LOVE #DREIST - Web radio
    if (args[0] === "2") {
      radio.playRadio(
        message.member.voiceChannel,
        message,
        "NRJ France",
        "http://185.52.127.168/fr/30001/mp3_128.mp3?origine=radio.net"
      );
    }

    // I LOVE TOP 100 CHARTS - Web radio
    if (args[0] === "3") {
      radio.playRadio(
        message.member.voiceChannel,
        message,
        "Virgin Radio",
        "http://icecast.unitedradio.it/Virgin.mp3"
      );
    }

    // I LOVE BASS - Web radio
    if (args[0] === "4") {
      radio.playRadio(
        message.member.voiceChannel,
        message,
        "Rire & Chansons",
        "http://cdn.nrjaudio.fm/adwz1/fr/55601/mp3_128.mp3?origine=radio.net"
      );
    }
  }
}

module.exports = radioo;
