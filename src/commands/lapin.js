const Command = require("../structures/Command");
const { get } = require("snekfetch");
const Discord = require("discord.js");

class lapin extends Command {
  constructor(client) {
    super(client, {
      name: "lapin",
      description: "Envoie la photo d'un lapin.",
      category: ":tiger: Animaux",
      usage: "lapin",
      aliases: ["bunny"]
    });
  }

  async run(message) {
    const client = this.client;
    const { body } = await get(
      "https://api.bunnies.io/v2/loop/random/?media=gif,png"
    );
    const dogembed = new Discord.RichEmbed()
      .setTitle("L'image ne s'affiche pas ? Clique ici :D")
      .setURL(body.media.gif)
      .setImage(body.media.gif)
      .setColor(0x36393f)
      .setTimestamp(new Date())
      .setFooter(client.user.username, client.user.avatarURL);
    message.channel.send(dogembed);
  }
}

module.exports = lapin;
