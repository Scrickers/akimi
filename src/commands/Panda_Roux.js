const Command = require("../structures/Command");
const { get } = require("snekfetch");
const Discord = require("discord.js");

class PandaRoux extends Command {
  constructor(client) {
    super(client, {
      name: "pandaroux",
      description: "Envoie la photo d'un Panda Roux.",
      category: ":tiger: Animaux",
      usage: "pandaroux",
      aliases: ["panda_roux"]
    });
  }

  async run(message) {
    const client = this.client;
    const { body } = await get("https://animals.anidiots.guide/red_panda");
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

module.exports = PandaRoux;
