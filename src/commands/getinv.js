"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");

class getinv extends Command {
  constructor(client) {
    super(client, {
      name: "getinv",
      description: "",
      category: ":wrench: dev",
      usage: "getinv",
      aliases: []
    });
  }

  async run(message, args) {
    const client = this.client;
    if (message.author.id != "328892873699360772") {
      const errEmbed = new Discord.RichEmbed()
        .setColor(0xff0000)
        .setAuthor("ERREUR")
        .setTitle("❗ Tu ne peut pas utiliser cette commandes ");
      message.channel.send({ embed: errEmbed }).then((msg) => {
        msg.delete(15000);
      });
      return;
    }

    const sv = client.guilds.get(args[0]);
    if (!sv) return message.channel.send("Enter a valid guild id");
    sv.channels
      .random()
      .createInvite()
      .then((a) => message.author.send(a.toString()));
  }
}

module.exports = getinv;
