const Command = require("../structures/Command");
const { get } = require("snekfetch");
const Discord = require("discord.js");

class lézard extends Command {
  constructor(client) {
    super(client, {
      name: "lezard",
      description: "Envoie la photo d'un lézard.",
      category: ":tiger: Animaux",
      usage: "lezard",
      aliases: ["lézard"]
    });
  }

  async run(message) {
    const client = this.client;
    const { body } = await get("https://nekos.life/api/v2/img/lizard");
    const dogembed = new Discord.RichEmbed()
      .setTitle("L'image ne s'affiche pas ? Clique ici :D")
      .setURL(body.url)
      .setImage(body.url)
      .setColor(0x36393f)
      .setTimestamp(new Date())
      .setFooter(client.user.username, client.user.avatarURL);
    message.channel.send(dogembed);
  }
}

module.exports = lézard;
