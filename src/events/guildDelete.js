"use strict";

const Event = require("../structures/Event");
const Discord = require("discord.js");

class guildDelete extends Event {
  constructor(args) {
    super(args, {
      name: "guildDelete"
    });
  }

  async run(guild) {
    const client = this.client;
    const channel = client.channels.get("547493913712394261");
    const bvn = new Discord.RichEmbed()
      .setColor("0x41f441")
      .setAuthor("J'ai été exclue d'un serveur", guild.iconURL)
      .addField("Nom du serveur", guild.name)
      .addField("Membres", guild.memberCount)
      .addField(
        "Owner du serveur",
        guild.owner.user.username + "#" + guild.owner.user.discriminator
      )
      .addField("ID", guild.id);
    channel.send({ embed: bvn });
    this.client.setting.delete(`${guild.id}`);
  }
}

module.exports = guildDelete;
