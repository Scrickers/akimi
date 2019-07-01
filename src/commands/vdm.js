"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");
const request = require("request");

class vdm extends Command {
  constructor(client) {
    super(client, {
      name: "vdm",
      description: "Raconte un \"vdm\".",
      category: ":gear:️ Bot",
      usage: "vdm",
      aliases: []
    });
  }

  async run(message) {
    const client = this.client;
    message.delete(300000);
    // eslint-disable-next-line no-useless-escape
    const regex = /<p class=\"block hidden-xs\">\n<a href=\".*\">\n(.*) VDM/;
    request("https://www.viedemerde.fr/aleatoire", (error, response, body) => {
      if (error) {
        return console.error(error);
      }
      const vdm = regex.exec(body);
      const inviteEmbed = new Discord.RichEmbed()
        .addField("Les vie de merdes ....", vdm[1])
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);

      return message.channel.send(inviteEmbed).then((msg) => {
        msg.delete(300000);
      });
    });
  }
}

module.exports = vdm;
