const Command = require("../structures/Command");
const Discord = require("discord.js");

class Help extends Command {
  constructor(client) {
    super(client, {
      name: "help",
      description: "Voir les commandes du bot.",
      category: ":gear:️ Bot",
      usage: "help",
      aliases: ["h", "cmds", "cmd"]
    });
  }

  async run(message, args) {
    const prefixes = this.client.setting.get(`${message.guild.id}`, "prefix");
    const argument = args.join(" ");

    if (!argument) {
      if (!message.channel.nsfw) {
        if (message.author.id != "328892873699360772") {
          const categories = [];

          await this.client.commands
            .filter(c => c.category !== ":wrench: dev" && ":underage: Nsfw")
            .forEach(async c => {
              if (!categories.includes(c.category)) {
                await categories.push(c.category);
              }
            });
          const embed = new Discord.RichEmbed()
            .setColor(0x36393f)
            .setAuthor(
              `${this.client.user.username}`,
              `${this.client.user.displayAvatarURL}`
            )
            .setFooter(
              `${prefixes}help <commande> pour afficher l'aide de la commandes.`
            )

            .addField(
              "**:underage: Nsfw**",
              `Pour voir les commandes \`🔞 Nsfw\` utilisez la commande ${prefixes}help dans un salon \"Nsfw\"`,
              false
            );
          await categories.sort().map(async c => {
            embed.addField(
              "**" + c + "**",
              await this.client.commands
                .filter(command => command.category === c)
                .map(command => `\`${command.name}\``)
                .join(" ▸ "),
              false
            );
          });
          await message.channel.send(embed);
        }

        if (message.author.id === "328892873699360772") {
          const categories = [];

          await this.client.commands
            .filter(c => c.category !== ":underage: Nsfw")
            .forEach(async c => {
              if (!categories.includes(c.category)) {
                await categories.push(c.category);
              }
            });
          const embed = new Discord.RichEmbed()
            .setColor(0x36393f)
            .setAuthor(
              `${this.client.user.username}`,
              `${this.client.user.displayAvatarURL}`
            )
            .setFooter(
              `${prefixes}help <commande> pour afficher l'aide de la commandes.`
            )

            .addField(
              "**:underage: Nsfw**",
              `Pour voir les commandes \`🔞 Nsfw\` utilisez la commande ${prefixes}help dans un salon \"Nsfw\"`,
              false
            );
          await categories.sort().map(async c => {
            embed.addField(
              c,
              await this.client.commands
                .filter(command => command.category === c)
                .map(command => `\`${command.name}\``)
                .join(" ▸ "),
              false
            );
          });
          await message.channel.send(embed);
        }

        //si le channel est nsfw
      }
      if (message.channel.nsfw) {
        if (message.author.id != "328892873699360772") {
          const categories = [];

          await this.client.commands
            .filter(c => c.category !== ":wrench: dev")
            .forEach(async c => {
              if (!categories.includes(c.category)) {
                await categories.push(c.category);
              }
            });
          const embed = new Discord.RichEmbed()
            .setColor(0x36393f)
            .setAuthor(
              `${this.client.user.username}`,
              `${this.client.user.displayAvatarURL}`
            )
            .setFooter(
              `${prefixes}help <commande> pour afficher l'aide de la commandes.`
            );
          await categories.sort().map(async c => {
            embed.addField(
              "**" + c + "**",
              await this.client.commands
                .filter(command => command.category === c)
                .map(command => `\`${command.name}\``)
                .join(" ▸ "),
              false
            );
          });
          await message.channel.send(embed);
        }
        if (message.author.id === "328892873699360772") {
          const categories = [];

          await this.client.commands.forEach(async c => {
            if (!categories.includes(c.category)) {
              await categories.push(c.category);
            }
          });
          const embed = new Discord.RichEmbed()
            .setColor(0x36393f)
            .setAuthor(
              `${this.client.user.username}`,
              `${this.client.user.displayAvatarURL}`
            )
            .setFooter(
              `${prefixes}help <commande> pour afficher l'aide de la commandes.`
            );
          await categories.sort().map(async c => {
            embed.addField(
              "**" + c + "**",
              await this.client.commands
                .filter(command => command.category === c)
                .map(command => `\`${command.name}\``)
                .join(" ▸ "),
              false
            );
          });
          await message.channel.send(embed);
        }
      }
    }
    //help specifique
    if (argument) {
      if (!this.client.commands.has(argument)) {
        return this.client.music.sendEmbed(
          message,
          "⚠ Aucune commande de ce nom trouvé !"
        );
      }
      const command = this.client.commands.get(argument);
      const aliases =
        command.aliases.length > 0
          ? command.aliases.map(a => `\`${a}\``).join(", ")
          : "Aucun";

      const embed = new Discord.RichEmbed()
        .setColor(0x36393f)
        .setAuthor(
          `${this.client.user.username}`,
          `${this.client.user.displayAvatarURL}`
        )
        .setDescription("Syntaxe:\n\n[] = option\n<> = obligation")
        .addField("Nom", command.name, false)
        .addField("Description", command.description, false)
        .addField("Categorie", command.category, false)
        .addField("Usage", prefixes + command.usage, false)
        .addField("Aliases", aliases, false)
        .setFooter(`${this.client.user.username} © 2019`);
      await message.channel.send(embed);
    }
  }
}

module.exports = Help;
