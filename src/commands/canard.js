const Command = require("../structures/Command");
const { get } = require("snekfetch");
const Discord = require("discord.js");

class canard extends Command {
  constructor(client) {
    super(client, {
      name: "canard",
      description: "Envoie la photo d'un canard.",
      category: ":tiger: Animaux",
      usage: "canard",
      aliases: ["duke", "cane"]
    });
  }

  async run(message) {
    const client = this.client;
    const { body } = await get("https://random-d.uk/api/v1/random?type=gif");
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

module.exports = canard;
