"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");
const weather = require("weather-js");

class meteo extends Command {
  constructor(client) {
    super(client, {
      name: "meteo",
      description: "Donne la météo dans un lieu.",
      category: ":gear:️ Bot",
      usage: "meteo <lieu>",
      aliases: ["météo"]
    });
  }

  async run(message, args) {
    const client = this.client;
    weather.find({ search: args.join(" "), degreeType: "C" }, function(
      err,
      result
    ) {
      if (err) message.channel.send(err);
      if (result === undefined || result.length === 0) {
        message.delete(15000);
        const errEmbed = new Discord.RichEmbed()
          .setColor(0xff0000)
          .setAuthor("ERREUR")
          .setTitle("❗ Indiquer un emplacement.");
        message.channel.send({ embed: errEmbed }).then((msg) => {
          msg.delete(15000);
        });
        return;
      }
      message.delete(60000);
      var current = result[0].current;
      var location = result[0].location;
      const embed = new Discord.RichEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(`Météo à ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .addField("Fuseau horaire", `UTC${location.timezone}`, true)
        .addField("Temperature", `${current.temperature}  Degrés`, true)
        .addField("ressentie", `${current.feelslike}  Degrés`, true)
        .addField("vents", current.winddisplay, true)
        .addField("Humidité", `${current.humidity}%`, true)
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({ embed }).then((msg) => {
        msg.delete(60000);
      });
    });
  }
}

module.exports = meteo;
