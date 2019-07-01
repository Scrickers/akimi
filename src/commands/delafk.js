"use strict";

const Command = require("../structures/Command");
class delafk extends Command {
  constructor(client) {
    super(client, {
      name: "delafk",
      description: "Supprime le mode afk.",
      category: ":gear:️ Bot",
      usage: "delafk",
      aliases: ["remafk"]
    });
  }

  async run(message) {
    const prefixes = this.client.setting.get(`${message.guild.id}`, "prefix");

    const key = `${message.guild.id}-${message.author.id}`;
    const afk = this.client.afk.get(key, "id");
    if (afk === message.author.id) {
      this.client.afk.set(key, "", "raison");
      this.client.afk.set(key, "", "id");
      this.client.afk.set(key, "", "date");
      message.channel.send("Vous avez bien enlevé le mode afk.");
    } else {
      message.channel.send(
        "Le mode AFK n'etais pas activer si vous vouliez l'activer utiliser la commande `" +
          prefixes +
          "afk`."
      );
    }
  }
}

module.exports = delafk;
