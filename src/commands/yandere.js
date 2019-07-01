const Command = require("../structures/Command");
const { get } = require("snekfetch");
const Discord = require("discord.js");

class Yandere extends Command {
  constructor(client) {
    super(client, {
      name: "yandere",
      description: 'Affiche une image nsfw "yandere"',
      category: ":underage: Nsfw",
      usage: "yandere",
      aliases: ["yan", "yand", "yd"]
    });
  }

  async run(message, args, level) {
    const client = this.client;
    if (!message.channel.nsfw) {
      const errEmbed = new Discord.RichEmbed()
        .setAuthor("Erreur")
        .setTitle("❗ Utiliser cette commande dans un salon **nsfw**.")
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({ embed: errEmbed }).then(msg => {
        msg.delete(15000);
      });
      return;
    }
    const { body } = await get(`http://yande.re/post.json?limit=300`);
    const result = body.random();

    const dogembed = new Discord.RichEmbed()
      .setTitle("L'image ne s'affiche pas ? Clique ici :D")
      .setURL(`http://yande.re/post/show/${result.id}`)
      .setImage(result.file_url)
      .setColor(0x36393f)
      .setTimestamp(new Date())
      .setFooter(client.user.username, client.user.avatarURL);
    message.channel.send(dogembed);
  }
}

module.exports = Yandere;
