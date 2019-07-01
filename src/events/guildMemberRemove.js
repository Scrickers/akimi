"use strict";

const Event = require("../structures/Event");

class guildMemberRemove extends Event {
  constructor(args) {
    super(args, {
      name: "guildMemberRemove"
    });
  }

  async run(member) {
    const i = this.client.setting.get(`${member.guild.id}`, "channels");

    if (!member.guild.channels.get(i)) return;

    const o = this.client.setting.get(`${member.guild.id}`, "messsageleave");

    if (!o) return;
    else
      member.guild.channels.get(i).send(
        o
          .replace("{user}", member.user.tag)
          .replace("{members}", member.guild.memberCount)
          .replace("{serv}", member.guild.name)
      );
  }
}

module.exports = guildMemberRemove;
