const Command = require("../structures/Command.js");
const pokemon = require("../json/pokemon.json");
const Discord = require("discord.js");

class Pokemon extends Command {
  constructor(client) {
    super(client, {
      name: "pokemon",
      description: "Devine les Pokémon",
      usage: "pokemon",
      category: ":slot_machine: jeux",
      aliases: []
    });
  }

  async run(message, args) {
    const client = this.client;
    // eslint-disable-line no-unused-vars
    const rand = Math.floor(Math.random() * 802);
    const poke = rand > 0 ? rand : Math.floor(Math.random() * 802);
    const pokem = pokemon[poke];

    const embed = new Discord.RichEmbed()
      .setTitle("Vous avez 15 secondes pour deviner! Qui est ce Pokémon!")
      .setImage(pokem.imageURL)
      .setColor(0x36393f)
      .setTimestamp(new Date())
      .setFooter(client.user.username, client.user.avatarURL);

    const msg = await message.channel.send({ embed });
    const filter = m => m.author.id === message.author.id;
    const attempts = await msg.channel.awaitMessages(filter, {
      time: 15000,
      max: 1
    });

    if (!attempts || !attempts.size) {
      msg.delete();
      return message.channel.send(
        `Vous avez pris trop de temps pour répondre. C'était ${
          pokem.name
        }.`
      );
    }

    const answer = attempts.first().content.toLowerCase();

    if (answer === pokem.name.toLowerCase()) {
      await msg.edit({ embed: null });
      return msg.channel.send(` 
Bien joué, ${pokem.name} était correct.`);
    }
    await msg.edit({ embed: null });
    return msg.channel.send(
      `Vous avez mal répondu, c'était **${pokem.name}.**`
    );
  }
}

module.exports = Pokemon;
