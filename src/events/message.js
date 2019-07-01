"use strict";

const Event = require("../structures/Event");
class Message extends Event {
  constructor(args) {
    super(args, {
      name: "Message"
    });
  }

  async run(message) {
    if (
      !message.channel.permissionsFor(this.client.user).has("SEND_MESSAGES")
    ) {
      return;
    }
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    this.client.setting.ensure(`${message.guild.id}`, {
      prefix: "*",
      log: "",
      channels: "",
      messsagewelcomes: "",
      messsagedm: "",
      messsageleave: "",
      autoroles: ""
    });
    this.client.points.ensure(`${message.guild.id}-${message.author.id}`, {
      points: 0,
      level: 1
    });
    this.client.afk.ensure(`${message.guild.id}-${message.author.id}`, {
      id: "",
      raison: "",
      date: ""
    });
    const key = `${message.guild.id}-${message.author.id}`;
    const prefixes = this.client.setting.get(`${message.guild.id}`, "prefix");

    if (!message.mentions.users.size === 0) {
      return;
    } else if (message.mentions.users.size === 1) {
      if (message.content.startsWith(prefixes)) {
        return;
      }
      const user = message.mentions.users.first();
      let getvalueof;
      if (user) {
        getvalueof = user;
      } else {
        getvalueof = message.author;
      }
      if (getvalueof.bot == true) {
        return;
      } else {
        const key2 = `${message.guild.id}-${user.id}`;
        const afk = this.client.afk.get(key2, "id");
        const raison = this.client.afk.get(key2, "raison");
        const date = this.client.afk.get(key2, "date");

        if (user.id === afk) {
          message.channel.send(
            "⏱ | **" +
              user.tag +
              "** est AFK pour la raison **" +
              raison +
              "** depuis **" +
              date +
              "**"
          );
        }
      }
    }

    const xp = Math.floor(Math.random() * 7 + 1);
    this.client.points.math(key, "+", xp, "points");

    const curLvl = Math.floor(
      0.1 * Math.sqrt(this.client.points.get(key, "points"))
    );

    if (this.client.points.get(key, "level") < curLvl) {
      message
        .reply(`tu es maintenant niveau **${curLvl}**! Je te félicite !`)
        .then(msg => {
          msg.delete(15000);
        });
      this.client.points.set(key, curLvl, "level");
    }

    if (
      !message.channel.permissionsFor(this.client.user).has("SEND_MESSAGES")
    ) {
      return;
    }

    const args = message.content
      .slice(prefixes.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!message.content.startsWith(prefixes)) {
      return;
    }

    if (this.client.commands.has(command)) {
      const cmd = this.client.commands.get(command);
      if (
        cmd.category === ":wrench: dev" &&
        message.author.id !== this.client.config.OWNER_ID
      ) {
        return;
      }
      await cmd.run(message, args);
    } else if (this.client.aliases.has(command)) {
      const cmd = this.client.aliases.get(command);
      await cmd.run(message, args);
    } else {
      return;
    }
  }
}

module.exports = Message;
