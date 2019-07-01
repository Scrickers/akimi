const Command = require("../structures/Command");
const { MessageAttachment } = require("discord.js");

class OSU extends Command {
  constructor(client) {
    super(client, {
      name: "osu",
      description: "Obtenir des infos sur votre profil osu.",
      usage: "osu <osu! pseudo>",
      category: ":slot_machine: jeux",
      aliases: []
    });
  }

  cmdVerify(message, args) {
    return this.verifyMember(
      message,
      message.mentions.members.size === 1
        ? message.mentions.members.first()
        : message.member,
      { msg: message }
    );
  }

  async run(message, args) {
    // eslint-disable-line no-unused-vars
    const member = await this.cmdVerify(message, args);
    await message.channel.send(
      new MessageAttachment(
        await this.client.AkimiAPI.osu(args.join(" "), "dark"),
        `osu-${member.id}.jpg`
      )
    );
    message.delete();
  }
}

module.exports = OSU;
