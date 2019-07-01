"use strict";

const Command = require("../structures/Command");

class pof extends Command {
  constructor(client) {
    super(client, {
      name: "pof",
      description: "Joue a pile ou face.",
      category: ":slot_machine: jeux",
      usage: "pof",
      aliases: []
    });
  }

  async run(message) {
    message.delete(message.author);
    const nb = Math.floor(Math.random() * 2 + 1);

    if (nb == 1) {
      message.channel.send({
        embed: {
          color: 3447003,
          title: "Pile",
          image: {
            url:
              "https://cdn.discordapp.com/attachments/446336017851482117/447485421459603456/pile.png"
          }
        }
      });
    }
    if (nb == 2) {
      message.channel.send({
        embed: {
          color: 3447003,
          title: "Face",
          image: {
            url:
              "https://cdn.discordapp.com/attachments/446336017851482117/447485423883649024/face.png"
          }
        }
      });
    }
  }
}

module.exports = pof;
