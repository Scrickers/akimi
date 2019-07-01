"use strict";

const Command = require("../structures/Command");

class Invite extends Command {
  constructor(client) {
    super(client, {
      name: "invite",
      description: "Envoie l'invitation du bot.",
      category: ":gear:️ Bot",
      usage: "invite",
      aliases: ["addbot"]
    });
  }

  async run(message) {
    const client = this.client;
    await client.music.sendEmbed(
      message,
      "Pour m'inviter, [cliquez-ici.](https://discordapp.com/oauth2/authorize?client_id=488046002784305156&scope=bot&permissions=8)"
    );
  }
}

module.exports = Invite;
