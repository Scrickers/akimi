"use strict";

const Command = require("../structures/Command");

class cleanup extends Command {
  constructor(client) {
    super(client, {
      name: "cleanup",
      description: "",
      category: ":wrench: dev",
      usage: "cleanup",
      aliases: []
    });
  }

  run(message, args) {
    const filtered = this.client.points.filter(
      p => p.guild === message.guild.id
    );
    const removed = filtered.filter(
      data => !message.guild.members.has(data.user)
    );
    removed.forEach(data => {
      this.client.points.delete(`${message.guild.id}-${data.user}`);
    });

    message.channel.send(`J'ai supprimé ${removed.size} membres.`);
  }
}

module.exports = cleanup;
