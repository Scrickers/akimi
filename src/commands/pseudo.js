const Command = require("../structures/Command");
const Discord = require("discord.js");
const name = require("./../json/name.json");

class newmane extends Command {
  constructor(client) {
    super(client, {
      name: "newname",
      description: "Donnes un nouveau pseudo a l'utilisateur.",
      category: ":gear:️ Bot",
      usage: "newname",
      aliases: ["pseudo", "newpseudo"]
    });
  }

  run(message) {
    let namef = name;
    namef = namef[Math.round(Math.random() * namef.length)];
    const errEmbed = new Discord.RichEmbed()
      .setColor(0x36393f)
      .setAuthor("~newmane~")
      .setTitle(
        "Votre nouveau pseudo vas etre **" +
          namef +
          "** cela vous convient-il ?"
      )
      .setTimestamp(new Date())
      .setFooter("repondre avec oui ou non");

    message.channel.send(errEmbed).then(async (m) => {
      const filter = (m) => m.author.id === message.author.id;
      await m.channel
        .awaitMessages(filter, { max: 1, time: 20000 })
        .then(async (collected) => {
          collected = collected.first();
          if (collected.content.toLowerCase() === "non") {
            return message.channel.send("votre pseudo n'a pas été changé.");
          }
          if (collected.content.toLowerCase() === "oui") {
            message.member
              .setNickname(namef)
              .catch(() =>
                message.channel.send(
                  "Une erreur s'est produite, le rôle du Bot est peut-être inférieur à votre rôle."
                )
              );
            return message.channel.send("votre pseudo a été changé.");
          }
        });
    });
  }
}
module.exports = newmane;
