const Command = require("../structures/Command");
const { get } = require("snekfetch");
const Discord = require("discord.js");

class oiseau extends Command {
  constructor(client) {
    super(client, {
      name: "oiseau",
      description: "Envoie la photo d'un oiseau.",
      category: ":tiger: Animaux",
      usage: "oiseau",
      aliases: ["bird"]
    });
  }

  async run(message) {
    const client = this.client;
    const { body } = await get("http://random.birb.pw/tweet/");
    const oiseau = `https://random.birb.pw/img/${body}`;
    const dogembed = new Discord.RichEmbed()
      .setTitle("L'image ne s'affiche pas ? Clique ici :D")
      .setURL(oiseau)
      .setImage(oiseau)
      .setColor(0x36393f)
      .setTimestamp(new Date())
      .setFooter(client.user.username, client.user.avatarURL);
    message.channel.send(dogembed);
  }
}

module.exports = oiseau;
