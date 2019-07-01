"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");
const moment = require("moment");
const os = require("os");
class bot extends Command {
  constructor(client) {
    super(client, {
      name: "bot",
      description: "Donne des information sur le bot.",
      category: ":gear:️ Bot",
      usage: "bot",
      aliases: ["botinfo", "botinfos"]
    });
  }

  async run(message) {
    const client = this.client;
    moment.locale("fr");
    message.delete(60000);

    const promises = [
      client.shard.fetchClientValues("guilds.size"),
      client.shard.broadcastEval(
        "this.guilds.reduce((prev, guild) => prev + guild.memberCount, 0)"
      ),
      client.shard.fetchClientValues("voiceConnections.size")
    ];

    Promise.all(promises)
      .then((results) => {
        const totalGuilds = results[0].reduce(
          (prev, guildCount) => prev + guildCount,
          0
        );
        const totalMembers = results[1].reduce(
          (prev, memberCount) => prev + memberCount,
          0
        );
        const voiceConnections = results[2].reduce(
          (prev, val) => prev + val,
          0
        );
        const bicon = client.user.displayAvatarURL;
        const botembed = new Discord.RichEmbed()
          .setTitle("Informations concernant le bot.")
          .setDescription("Voici quelques informations sur moi.")
          .addField("nom du bot", client.user.username, true)
          .setThumbnail(bicon)
          .addField("Crée par", "`๖̶̶̶ζ͜͡𝓢𝓬𝓻𝓲𝓬𝓴𝒆𝓻#6131`", true)
          .addField(
            "Crée le",
            moment(client.user.createdAt).add(2, 'hours').format("Do MMMM YYYY, LTS"),
            true
          )
          .addField("Version", require("../../package").version, true)
          .addField("Servers", totalGuilds, true)
          .addField("Membres", totalMembers, true)
          .addField("Discord.js ", Discord.version, true)
          .addField("node ", `${process.version}`, true)
          .addField("Nombre de connections", `${voiceConnections}`, true)
          .addField(
            "RAM",
            `${Math.trunc(
              process.memoryUsage().heapUsed / 1024 / 1000
            )} MB / ${Math.trunc(os.totalmem() / 1024 / 1000)} MB (${Math.round(
              (Math.round(process.memoryUsage().heapUsed / 1024 / 1024) /
                Math.round(os.totalmem() / 1024 / 1024)) *
                100
            )}%)`,
            true
          )
          .addField(
            "CPU",
            `${os.cpus()[0].model} @${os.cpus()[0].speed}MHz`,
            true
          )
          .setColor(0x36393f)
          .setTimestamp(new Date())
          .setFooter(client.user.username, client.user.avatarURL);

        return message.channel.send(botembed).then((msg) => {
          msg.delete(60000);
        });
      })
      .catch(console.error);
  }
}

module.exports = bot;
