"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");
var steam = require("steam-provider");
var provider = new steam.SteamProvider();

class steams extends Command {
  constructor(client) {
    super(client, {
      name: "steam",
      description: "Recherche un jeux sur steam.",
      category: ":gear:️ Bot",
      usage: "steam <jeux>",
      aliases: []
    });
  }

  async run(message) {
    const prefixes = this.client.setting.get(`${message.guild.id}`, "prefix");
    const client = this.client;
    const args = message.content.split(" ").slice(1);
    const game = args.join(" ");
    const steampng =
      "https://cdn.discordapp.com/attachments/458004691402489856/470344660364034049/steam.png";

    if (!game) {
      message.delete(15000);
      const errEmbed = new Discord.RichEmbed()
        .setColor(0xff0000)
        .setAuthor("ERREUR")
        .setTitle(
          "❗ S'il vous plaît donnez le nom d'un jeu de steam. Example: " +
            `**${prefixes}steam portal 2**`
        );
      message.channel.send({ embed: errEmbed }).then((msg) => {
        msg.delete(15000);
      });
      return;
    }
    message.delete(120000);
    provider.search(game).then((result) => {
      provider.detail(result[0].id, "french", "fr").then((results) => {
        let initial_price;
        let final_price;
        let metacritic_score;

        console.log(results);
        initial_price = `${results.priceData.initialPrice}€`;
        if (initial_price == 0.0) initial_price = "Free";

        final_price = `${results.priceData.finalPrice}€`;
        if (final_price == 0.0) final_price = "Free";

        if (final_price !== initial_price)
          initial_price = `~~${results.priceData.initialPrice}€~~`;

        if (final_price == initial_price) final_price = ":x:";

        metacritic_score = results.otherData.metacriticScore;
        if (metacritic_score == null) metacritic_score = ":x:";
        const embed = new Discord.RichEmbed()
          .setAuthor("Magasins steam", steampng)
          .setTitle(`${result[0].name}`)
          .addBlankField()
          .setThumbnail(results.otherData.imageUrl)
          .addField("🆔 Game ID", result[0].id, true)
          .addField("📋 Genres", results.genres, true)
          .addBlankField()
          .addField(
            "💰 Prix",
            `● Prix normal : **${initial_price}**\n● prix apres reduction : **${final_price}** `,
            true
          )
          .addField("💻 Platforms", results.otherData.platforms, true)
          .addBlankField()
          .addField("✅ Score métacritique", metacritic_score, true)
          .addField("🔘 Tags", results.otherData.features, true)
          .addBlankField()
          .addField("🚀 Developer par", results.otherData.developer, true)
          .addField("📜 Publier par", results.otherData.publisher, true)
          .setColor(0x36393f)
          .setTimestamp(new Date())
          .setFooter(client.user.username, client.user.avatarURL);

        message.channel
          .send(embed)
          .then((msg) => {
            msg.delete(120000);
          })
          .catch((e) => {
            message.reply("Le jeux " + game + "` n'a pas été trouver !");
            console.log(e);
          });
      });
    });
  }
}

module.exports = steams;
