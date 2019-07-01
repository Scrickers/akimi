"use strict";

const Event = require("../structures/Event");

class guildMemberAdd extends Event {
  constructor(args) {
    super(args, {
      name: "guildMemberAdd"
    });
  }

  async run(member) {
    const u = this.client.setting.get(`${member.guild.id}`, "channels");

    const o = this.client.setting.get(`${member.guild.id}`, "messsagedm");

    // DM User
    if (!o) return;
    else
      member.send(
        o
          .replace("{user}", member)
          .replace("{members}", member.guild.memberCount)
          .replace("{serv}", member.guild.name)
      );
    if (!member.guild.channels.get(u)) return;

    const p = this.client.setting.get(`${member.guild.id}`, "messsagewelcomes");
    if (!p) return;
    else
      member.guild.channels.get(u).send(
        p
          .replace("{user}", member)
          .replace("{members}", member.guild.memberCount)
          .replace("{serv}", member.guild.name)
      );
    
    this.client.points.ensure(`${member.guild.id}-${member.author.id}`, {
      points: 0,
      level: 1
    });
  }
}
module.exports = guildMemberAdd;
