"use strict";

const Command = require("../structures/Command");
class listradio extends Command {
  constructor(client) {
    super(client, {
      name: "lradio",
      description: "Envoye la liste des radio.",
      category: ":musical_note: Musique",
      usage: "lradio",
      aliases: ["lr", "rl","lradio"]
    });
  }

  async run(message) {
    const PREFIX = this.client.setting.get(`${message.guild.id}`, "prefix");
    message.channel.send({
      embed: {
        color: 3447003,
        title: "-> list Radio <-",
        fields: [
          {
            name: PREFIX + "radio",
            value: "Radio: **Top music**"
          },
          {
            name: PREFIX + "radio 1",
            value: "Radio: **skyrock**"
          },
          {
            name: PREFIX + "radio 2",
            value: "Radio: **NRJ France**"
          },
          {
            name: PREFIX + "radio 3",
            value: "Radio: **Virgin Radio**"
          },
          {
            name: PREFIX + "radio 4",
            value: "Radio: **Rire & Chansons**"
          }
        ],
        timestamp: new Date()
      }
    });
  }
}

module.exports = listradio;
