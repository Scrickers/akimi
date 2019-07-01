const { get } = require("snekfetch");
const Command = require("../structures/Command");
const Discord = require("discord.js");

class aavatar extends Command {
  constructor(client) {
    super(client, {
      name: "gavatar",
      description: "Affiche une photo de profil de type anime.",
      usage: "aavatar",
      category: ":frame_photo: Image",
      aliases: ["aav", "aavatar"]
    });
  }

  async run(message) {
    const client = this.client;
    const { body } = await get(
      `https://nekos.life/api/v2/img/${
        message.channel.nsfw ||
        message.channel.name.startsWith("nsfw-") ||
        message.channel.name.startsWith("nsfw_")
          ? "nsfw_"
          : ""
      }avatar`
    );
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

module.exports = aavatar;
