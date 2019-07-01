"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");
const moment = require("moment");

class userinfo extends Command {
  constructor(client) {
    super(client, {
      name: "userinfo",
      description: "Donne des infos sur un utilisateur.",
      category: ":gear:️ Bot",
      usage: "userinfo <utilisateur>",
      aliases: ["user"]
    });
  }

  async run(message, args) {
    const client = this.client;
    message.delete(120000);
    moment.locale("fr");

    const mentionned = message.guild.member(
      message.mentions.users.first() || message.guild.members.get(args[0])
    );

    var mentionnedbot = message.mentions.users.first();
    let getvalueof;
    let checkbot;
    let status;

    if (mentionnedbot) {
      getvalueof = mentionnedbot;
    } else {
      getvalueof = message.author;
    }

    if (getvalueof.bot == true) {
      checkbot = "🤖 Bot";
    } else {
      checkbot = "😁 Humain";
    }

    if (!mentionned) {
      return message.channel.send("Vous n'avez mentionner aucun utilisateur !");
    }

    if (mentionned.presence.status == "online") {
      status = "En ligne";
    } else if (mentionned.presence.status == "offline") {
      status = "Hors ligne";
    } else if (mentionned.presence.status == "idle") {
      status = "Inactif";
    } else if (mentionned.presence.status == "dnd") {
      status = "Ne pas déranger";
    }
    const userEmbed = new Discord.RichEmbed()
      .setThumbnail(message.member.displayAvatarURL)
      .setThumbnail(mentionnedbot.displayAvatarURL)
      .setTimestamp()
      .addField("👤 Pseudo :", `${mentionnedbot}`, true)
      .addField(
        ":hash: Descriminateur :",
        `#${mentionnedbot.discriminator}`,
        true
      )
      .addBlankField()
      .addField("✏️ID :", `${mentionned.id}`, true)
      .addField("🕵 Type :", checkbot, true)
      .addBlankField()
      .addField("🔘 Status :", status, true)
      .addField(
        "🎮 Game :",
        `${
          mentionned.presence.game
            ? `${mentionned.presence.game.name}`
            : "Ne joue à rien"
        }`,
        true
      )
      .addBlankField()
      .addField(
        `📜 Rôle(s) : ${mentionned.roles.size - 1} rôle(s)`,
        `- ${mentionned.roles
          .array()
          .map((g) => g)
          .join("\n- ")}`,
        true
      )
      .addBlankField()
      .addField(
        "🚪 Arrivée sur le serveur :",
        moment(mentionned.joinedAt).format("Do MMMM YYYY, LTS"),
        true
      )
      .addField(
        "🛠 Compte créé le :",
        moment(mentionnedbot.createdAt).format("Do MMMM YYYY, LTS"),
        true
      )
      .addBlankField()
      .addField(
        "⭕ Kickable",
        `${mentionned.kickable ? "✅ Oui " : "❌ Non"}`,
        true
      )
      .addField(
        "⭕ Bannable",
        `${mentionned.bannable ? "✅ Oui " : "❌ Non"}`,
        true
      )
      .addBlankField()
      .setColor(0x36393f)
      .setTimestamp(new Date())
      .setFooter(client.user.username, client.user.avatarURL);

    return message.channel.send(userEmbed).then((msg) => {
      msg.delete(120000);
    });
  }
}

module.exports = userinfo;
