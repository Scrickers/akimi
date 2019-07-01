"use strict";

const Command = require("../structures/Command");

class rps extends Command {
  constructor(client) {
    super(client, {
      name: "rps",
      description: "Joue a pierre papier Ciseaux.",
      category: ":slot_machine: jeux",
      usage: "rps <pierre|papier|Ciseaux>",
      aliases: []
    });
  }

  async run(message, args) {
    let choice2;
    let response;
    let numb;

    var choice = args[1];
    if (choice == "papier" || choice == "p") {
      numb = Math.floor(Math.random() * 75 + 0);
      if (numb <= 25) {
        choice2 = "papier";
      } else if ((numb > 25) & (numb <= 50)) {
        choice2 = "pierre";
      } else if (numb > 50) {
        choice2 = "ciseaux";
      }
      if (choice2 == "ciseaux") {
        response = "Je choisis ** Ciseaux **! :v: je gagne!";
      } else if (choice2 == "papier") {
        response =
          "Je choisis ** papier **! :hand_splayed: C'est une égalité !";
      } else {
        response = "Je choisis ** pierre **! :punch: tu gagne !";
      }
      message.channel.send(response);
    } else if (choice == "pierre" || choice == "r") {
      numb = Math.floor(Math.random() * 75 + 0);
      if (numb <= 50) {
        choice2 = "papier";
      } else if (numb > 50 && numb <= 100) {
        choice2 = "pierre";
      } else if (numb > 100) {
        choice2 = "ciseaux";
      }
      if (choice2 == "papier") {
        response = "Je choisis ** papier **! :hand_splayed: je gagne !";
      } else if (choice2 == "pierre") {
        response = "Je choisis ** pierre **! :punch: C'est une égalité !";
      } else {
        response = "Je choisis ** Ciseaux **! :v: tu gagne!";
      }
      message.channel.send(response);
    } else if (choice == "Ciseaux" || choice == "s") {
      numb = Math.floor(Math.random() * 75 + 0);
      if (numb <= 50) {
        choice2 = "papier";
      } else if (numb > 50 && numb <= 100) {
        choice2 = "pierre";
      } else if (numb > 100) {
        choice2 = "ciseaux";
      }
      if (choice2 == "pierre") {
        response = "Je choisis ** papier **! :hand_splayed: tu gagnez!";
      } else if (choice2 == "scissors") {
        response = "Je choisis ** Ciseaux **! :v: C'est une égalité !";
      } else {
        response = "Je choisis ** pierre **! :punch: je gagne!";
      }
      message.channel.send(response);
    } else {
      const prefixes = this.client.setting.get(`${message.guild.id}`, "prefix");
      message.channel.send(
        `Vous devez utilisez ${prefixes}rps <pierre|papier|Ciseaux>.`
      );
    }
  }
}

module.exports = rps;
