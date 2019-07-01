"use strict";

const Event = require("../structures/Event");
const Discord = require("discord.js");

class guildCreate extends Event {
  constructor(args) {
    super(args, {
      name: "guildCreate"
    });
  }

  async run(guild) {
    const client = this.client;
    const channel = client.channels.get("547493690529284107");
    const bvn = new Discord.RichEmbed()
      .setColor("0x41f441")
      .setAuthor("J'ai été invité dans un serveur", guild.iconURL)
      .addField("Nom du serveur", guild.name)
      .addField("Membres", guild.memberCount)
      .addField(
        "Owner du serveur",
        guild.owner.user.username + "#" + guild.owner.user.discriminator
      )
      .addField("ID", guild.id);
    channel.send({ embed: bvn });
    this.client.setting.ensure(`${guild.id}`, {
      prefix: "*",
      log: "",
      channels: "",
      messsagewelcomes: "",
      messsagedm: "",
      messsageleave: "",
      autoroles: ""
    });
  }
}

module.exports = guildCreate;
