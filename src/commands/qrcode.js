"use strict";
const Command = require("../structures/Command");
const qrcode = require("qrcode");
const tempy = require("tempy");

class qrcodes extends Command {
  constructor(client) {
    super(client, {
      name: "qrcode",
      description: "Crée un qrcode mais que ce cache t'il dedans ?",
      category: ":tada: Fun",
      usage: "qrcode  <text>",
      aliases: []
    });
  }

  async run(message, args) {
    message.delete();
    const qrOutput = tempy.file({ extension: "png" });
    message.channel.startTyping();
    if (args.length > 0) {
      qrcode.toFile(qrOutput, args.join(" "), { margin: 1 }, (error) => {
        if (error) throw new Error(error);
        message.channel.stopTyping();
        message.channel.send({
          files: [
            {
              attachment: qrOutput,
              name: "qr.png"
            }
          ]
        });
      });
    } else {
      message.channel.stopTyping();
      message.reply("Vous devez fournir du texte pour générer un QR code!");
    }
  }
}
module.exports = qrcodes;
