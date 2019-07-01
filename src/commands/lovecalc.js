"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");

class lovecalc extends Command {
  constructor(client) {
    super(client, {
      name: "lovecalc",
      description: "fait un test d'amour",
      category: ":tada: Fun",
      usage: "lovecalc",
      aliases: []
    });
  }

  async run(message, args) {
    const client = this.client;
    const user1 = message.guild.member(
      message.mentions.users.first() || message.guild.members.get(args[0])
    );
    const user2 = message.guild.member(
      message.mentions.users.last() || message.guild.members.get(args[1])
    );

    if (!user1)
      return message.channel.send("Vous devez mentionner un utilisateur.");
    if (message.mentions.users.size != 2)
      return message.channel.send(
        "Vous deviez mentionner un deuxieme utilisateur"
      );
    if (user1.id === user2.id && user1.id === message.author.id) {
      const embed = new Discord.RichEmbed()
        .setTitle("L'amour de toi même est à 100% !!! (Narcissique va !)")
        .setImage(
          "https://cdn.discordapp.com/attachments/446025029726109717/543508536232116366/selfhug.gif"
        )
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send(embed);
      return;
    }
    if (user1.id === user2.id) {
      const embed = new Discord.RichEmbed()
        .setTitle("Les deux utilisateur sont identique.")
        .setImage(
          "https://cdn.discordapp.com/attachments/446025029726109717/543508536232116366/selfhug.gif"
        )
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send(embed);
      return;
    }
    let f = user1.id + user2.id;
    f = f / 10000000000000000000000000000000000;
    f = Math.round(f);
    const embedl = new Discord.RichEmbed()
      .setTitle("❤ Calculeur d'amour ❤")
      .setDescription(`L'Amour entre ${user1} et ${user2} est à **${f}%**.`)
      .setColor(0x36393f)
      .setTimestamp(new Date())
      .setFooter(client.user.username, client.user.avatarURL);
    message.channel.send(embedl);
  }
}

module.exports = lovecalc;
