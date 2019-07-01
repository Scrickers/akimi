"use strict";

const Command = require("../structures/Command");
const { get } = require("axios");

class beautiful extends Command {
  constructor(client) {
    super(client, {
      name: "beautiful",
      description: "",
      category: ":frame_photo: Image",
      usage: "beautiful [Utilisateur]",
      aliases: []
    });
  }

  async run(message) {
    let target = message.mentions.users.first();
    if (!target) {
      target = message.author;
    }
    const profilepic = target.displayAvatarURL;
    message.channel.send("Génération de l'image....").then(msg => {
      get(`https://eclyssia-api.tk/api/v1/beautiful?url=${profilepic}`, {
        responseType: "arraybuffer"
      })
        .then(res =>
          message.channel.send({
            file: { attachment: res.data, name: "image.png" }
          })
        )
        .then(() => msg.delete())
        .catch(err => {
          if (err) {
            msg.delete();
            message.channel.send(
              "Une erreur est survenue avec l'api, veuillez réessayer !"
            );
          }
        });
    });
  }
}

module.exports = beautiful;
