const Command = require("../structures/Command");
const { get } = require("snekfetch");
const Discord = require("discord.js");

class Lion extends Command {
  constructor(client) {
    super(client, {
      name: "lion",
      description: "Envoie la photo d'un lion.",
      category: ":tiger: Animaux",
      usage: "lion",
      aliases: []
    });
  }

  async run(message) {
    const client = this.client;
    const { body } = await get("https://animals.anidiots.guide/lion");
    const dogembed = new Discord.RichEmbed()
      .setTitle("L'image ne s'affiche pas ? Clique ici :D")
      .setURL(body.link)
      .setImage(body.link)
      .setColor(0x36393f)
      .setTimestamp(new Date())
      .setFooter(client.user.username, client.user.avatarURL);
    message.channel.send(dogembed);
  }
}

module.exports = Lion;
