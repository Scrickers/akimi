"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");
const hastebin = require("hastebin-gen");
class list extends Command {
  constructor(client) {
    super(client, {
      name: "list",
      description:
        "Permets de voir les serveurs de plus de 200 user où le bot est présent.",
      category: ":gear:️ Bot",
      usage: "list ",
      aliases: []
    });
  }

  async run(message) {
    const client = this.client
    const guilds = client.guilds
      .filter((g) => g.memberCount > 350)
      .map((g) => "*-* " + g.name + " **(" + g.memberCount + ")**")
      .join("\n");
    const embed = new Discord.RichEmbed()
      .setColor(0x36393f)
      .addField(`Liste des serveurs ayant plus de 350 utilisateurs: (shards: ${this.client.options.shardId +1} )`, guilds)
      .setTimestamp(new Date())
      .setFooter(client.user.username, client.user.avatarURL);
    message.channel.send(embed);
    var guild = client.guilds
      .map(
        (g) =>
          "=> nom: " +
          g.name +
          " || Membres: " +
          g.memberCount +
          " || Id: " +
          g.id +
          " || salons: " +
          g.channels.size
      )
      .join("\n");
    hastebin(guild).then((guild) => {
      message.channel.send("Les autres serveur sont ici => " + guild);
    });
  }
}
module.exports = list;
