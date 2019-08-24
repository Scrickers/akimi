"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");

class Leaderboard extends Command {
  constructor(client) {
    super(client, {
      name: "leaderboard",
      description: "Affiche le classement des personnes ayant le plus d'xp.",
      category: ":yum: Utilisateur",
      usage: "leaderboard",
      aliases: ["ld"]
    });
  }

  run(message, args) {
    const leaderboard = [];
    const lbServer = [];

    const list = this.client.points.filter(p => p.guild === message.guild.id);

    let page = parseInt(args[0]) ? parseInt(args[0]) : 1;
    const totalPages = Math.round(list.size / 10);
    if (totalPages === 0)
      return message.channel.send(
        "Il n'y a pas de classement dans le serveur, peut-être que c'est un endroit mort ???"
      );
    page -= 1;
    if (page > totalPages && !totalPages)
      return message.channel.send(`voici la **${totalPages || 1}** pages.`);
    if (totalPages && page + 1 > totalPages)
      return message.channel.send(`voici la **${totalPages || 1}** pages.`);
    //user position
    list
      .map(p => ({ points: p.points, user: p.user }))
      .sort((a, b) => (b.points > a.points ? 1 : -1))
      .map(us => {
        lbServer.push(us.user);
      });

    list
      .map(p => ({ points: p.points, user: p.user }))
      .sort((a, b) => (b.points > a.points ? 1 : -1))
      .slice(page * 10, (page + 1) * 10)
      .map((u, i) => {
        leaderboard.push(
          `${(page * 10 + (i + 1)).toString().padStart(2, "0")} ❯ ${
            this.client.users.get(u.user).tag
          }${" ".repeat(
            40 - this.client.users.get(u.user).tag.length
          )}::  ${u.points.toLocaleString()}`
        );
      });
    leaderboard.push(
      "-------------------------------------------------------------"
    );

    const pos = lbServer
      .indexOf(message.author.id)
      .toString()
      .padStart(2, "0");
    const posTxt =
      pos == -1
        ? "??"
        : (lbServer.indexOf(message.author.id) + 1).toString().padStart(2, "0");
    leaderboard.push(
      `${posTxt} ❯ ${message.author.tag}${" ".repeat(
        40 - message.author.tag.length
      )}::  ${this.client.points
        .get(`${message.guild.id}-${message.author.id}`)
        .points.toLocaleString()}`
    );
    return message.channel.send(
      `**__${message.guild.name}__**'s Leaderboard (Page **${page +
        1}** sur **${totalPages || 1}**)\n\`\`\`${leaderboard.join(
        "\n"
      )}\`\`\``
    );
  }
}

module.exports = Leaderboard;
