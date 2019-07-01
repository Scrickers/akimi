const Command = require("../structures/Command");
const { get } = require("snekfetch");
const Discord = require("discord.js");

class hibou extends Command {
  constructor(client) {
    super(client, {
      name: "hibou",
      description: "Envoie la photo d'un hibou.",
      category: ":tiger: Animaux",
      usage: "hibou",
      aliases: []
    });
  }

  async run(message) {
    const client = this.client;
    const hibou = await get("http://pics.floofybot.moe/owl").then(
      r => r.body.image
    ); // API Provided by Lewdcario
    const dogembed = new Discord.RichEmbed()
      .setTitle("L'image ne s'affiche pas ? Clique ici :D")
      .setURL(hibou)
      .setImage(hibou)
      .setColor(0x36393f)
      .setTimestamp(new Date())
      .setFooter(client.user.username, client.user.avatarURL);
    message.channel.send(dogembed);
  }
}

module.exports = hibou;
