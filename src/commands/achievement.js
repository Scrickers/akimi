const snekfetch = require("snekfetch");
const Discord = require("discord.js");
const Command = require("../structures/Command");
class achievement extends Command {
  constructor(client) {
    super(client, {
      name: "achievement",
      description: "Donne une image d'achievement Minecraft personnalisé",
      category: ":frame_photo: Image",
      usage: "achievement <text>",
      aliases: []
    });
  }
  async run(message) {
    const prefixes = this.client.setting.get(`${message.guild.id}`, "prefix")
    const client = this.client;
    const args = message.content.split(/\s+/g);
    let contents = args.join(" ").slice(13);
    if (!contents) {
      message.delete(15000);
      const errEmbed = new Discord.RichEmbed()
        .setColor(0x36393f)
        .setAuthor("Erreur")
        .setTitle(`❗ Utilisation : ${prefixes}achievement (text).`)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({ embed: errEmbed }).then(msg => {
        msg.delete(15000);
      });
      return;
    }

    let title = "Achievement obtenu";

    if (!contents) {
      [title, contents] = ["Achievement obtenu", title];
    }
    let rnd = Math.floor(Math.random() * 39 + 1);
    if (
      args
        .join(" ")
        .toLowerCase()
        .includes("burn")
    )
      rnd = 38;
    if (
      args
        .join(" ")
        .toLowerCase()
        .includes("cookie")
    )
      rnd = 21;
    if (
      args
        .join(" ")
        .toLowerCase()
        .includes("cake")
    )
      rnd = 10;

    if (contents.length > 22) {
      message.delete(15000);
      const errEmbed = new Discord.RichEmbed()
        .setColor(0xff0000)
        .setAuthor("Erreur")
        .setTitle("❗ Pour éviter les bug la limite a été mis à 22.")
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({ embed: errEmbed }).then(msg => {
        msg.delete(15000);
      });
      return;
    }
    const url = `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(
      title
    )}&t=${encodeURIComponent(contents)}`;
    snekfetch
      .get(url)
      .then(r => message.channel.send("", { files: [{ attachment: r.body }] }));
    message.delete(3600000);
  }
}

module.exports = achievement;
