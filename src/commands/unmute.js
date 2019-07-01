"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");

class unmute extends Command {
  constructor(client) {
    super(client, {
      name: "unmute",
      description: "Unmute un utilisateur.",
      category: ":name_badge: Modération",
      usage: "unmute <utilisateur>",
      aliases: []
    });
  }

  async run(message, args) {
    const client = this.client;
    if (!message.member.hasPermission("KICK_MEMBERS")) {
      message.delete(15000);
      const errEmbed = new Discord.RichEmbed()
        .setColor(0xff0000)
        .setAuthor("ERREUR")
        .setTitle("❗ Je n'ai pas la permission.")
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({ embed: errEmbed }).then((msg) => {
        msg.delete(15000);
      });
      return;
    }
    const modlog = this.client.setting.get(`${message.guild.id}`, "log");
    const mod = message.author;
    const User = message.guild.member(
      message.mentions.users.first() || message.guild.members.get(args[0])
    );
    if (!User) {
      message.delete(15000);
      const errEmbed = new Discord.RichEmbed()
        .setColor(0xff0000)
        .setAuthor("ERREUR")
        .setTitle("❗ Vous devez mentionner un utilisateur")
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({ embed: errEmbed }).then((msg) => {
        msg.delete(15000);
      });
      return;
    }

    let muterole = this.client.setting.get(`${message.guild.id}`, "log");
    if (!modlog) {
      const prefixes = this.client.setting.get(`${message.guild.id}`, "prefix");
      message.delete(15000);
      const errEmbed = new Discord.RichEmbed()
        .setAuthor("Erreur")
        .setTitle(
          `Le channel "logs" n'est pas défini utiliser la commande ${prefixes}setlog.`
        )
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({ embed: errEmbed }).then((msg) => {
        msg.delete(15000);
      });
      return;
    }
    if (!muterole) {
      try {
        muterole = await message.guild.createRole({
          name: "Muted",
          color: "#FFFFFF",
          permissions: []
        });
        message.guild.channels.forEach(async (channel) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      } catch (e) {
        console.log(e.stack);
      }
    }
    await User.removeRole(muterole.id);
    message.reply(`${User} à bien été démute!`);
    const muteembed = new Discord.RichEmbed()
      .setAuthor(
        "~unmute~",
        "https://images-ext-2.discordapp.net/external/Wms63jAyNOxNHtfUpS1EpRAQer2UT0nOsFaWlnDdR3M/https/image.flaticon.com/icons/png/128/148/148757.png"
      )
      .addField("Utilisateur", `<@${User.id}> a été Démute`)
      .addField("Modérateur", `${mod}`)
      .setColor(0x36393f)
      .setTimestamp(new Date())
      .setFooter(client.user.username, client.user.avatarURL);
    modlog.send(muteembed);
  }
}

module.exports = unmute;
