const Command = require("../structures/Command");
const { get } = require("snekfetch");
const Discord = require("discord.js");

class shiba extends Command {
  constructor(client) {
    super(client, {
      name: "shiba",
      description: "Envoie la photo d'un Shiba Inu.",
      category: ":tiger: Animaux",
      usage: "shiba",
      aliases: []
    });
  }

  async run(message) {
    const client = this.client;
    const { body } = await get("http://shibe.online/api/shibes");
    const dogembed = new Discord.RichEmbed()
      .setTitle("L'image ne s'affiche pas ? Clique ici :D")
      .setURL(body[0])
      .setImage(body[0])
      .setColor(0x36393f)
      .setTimestamp(new Date())
      .setFooter(client.user.username, client.user.avatarURL);
    message.channel.send(dogembed);
  }
}

module.exports = shiba;
