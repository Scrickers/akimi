const Command = require("../structures/Command");
const malScraper = require("mal-scraper");
const Discord = require("discord.js");

class anime extends Command {
  constructor(client) {
    super(client, {
      name: "anime",
      description: "Donne des infos sur un animé.",
      category: ":gear:️ Bot",
      usage: "anime <nom>",
      aliases: []
    });
  }

  run(message, args) {
    const client = this.client;
    const search = args.join(" ");

    malScraper
      .getInfoFromName(search)
      .then(data => {
        const malEmbed = new Discord.RichEmbed()
          .setThumbnail(data.picture)
          .addField("English Title", data.englishTitle, true)
          .addField("Japanese Title", data.japaneseTitle, true)
          .addField("Type", data.type, true)
          .addField("Épisodes", data.episodes, true)
          .addField("Age", data.rating, true)
          .addField("Sortie", data.aired, true)
          .addField("Score", data.score + "/10", true)
          .addField("Notée par", data.scoreStats, true)
          .addField("Lien", data.url)
          .setColor(0x36393f)
          .setTimestamp(new Date())
          .setFooter(client.user.username, client.user.avatarURL);
        message.channel.send(malEmbed);
      })
      .catch(
        err => console.log(err) && message.channel.send("aucun animer trouver")
      );
  }
}
module.exports = anime;
