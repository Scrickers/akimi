const Command = require("../structures/Command");
const { get } = require("snekfetch");
const Discord = require("discord.js");

class renard extends Command {
  constructor(client) {
    super(client, {
      name: "renard",
      description: "Envoie la photo d'un fox.",
      category: ":tiger: Animaux",
      usage: "renard",
      aliases: ["fox", "renarde"]
    });
  }

  async run(message) {
    const client = this.client;
    const { body } = await get("https://randomfox.ca/floof/");
    const dogembed = new Discord.RichEmbed()
      .setTitle("L'image ne s'affiche pas ? Clique ici :D")
      .setURL(body.link)
      .setImage(body.image)
      .setColor(0x36393f)
      .setTimestamp(new Date())
      .setFooter(client.user.username, client.user.avatarURL);
    message.channel.send(dogembed);
  }
}

module.exports = renard;
