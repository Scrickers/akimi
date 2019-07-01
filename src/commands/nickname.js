"use strict";

const Command = require("../structures/Command");
const config = require("./../../configs.js");

class nickname extends Command {
  constructor(client) {
    super(client, {
      name: "nickname",
      description: "Change le nom du bot.",
      category: ":wrench: dev",
      usage: "nickname <name> ",
      aliases: ["name"]
    });
  }

  async run(message, args) {
    const client = this.client;
    if (message.author.id === config.OWNER_ID) {
      const newname = args.join(" ");
      client.user.setUsername(newname);

      message.channel
        .send(`Okay, mon nouveaux nom est ${newname}!`)
        .then((m) => {
          message.delete(100);
          m.delete(10000);
        });
    } else {
      message.channel.send("Vous n'avez pas la permision de faire cela !");
    }
  }
}
module.exports = nickname;
