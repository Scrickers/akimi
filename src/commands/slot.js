"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");
const slots = [
  "💎",
  "💰",
  "💵",
  "💳",
  "🎮",
  "🎱",
  "🏦",
  "🍒",
  "🎲",
  "🏇",
  "💸"
];
class slot extends Command {
  constructor(client) {
    super(client, {
      name: "slot",
      description: "Joue à une machine à sous.",
      category: ":slot_machine: jeux",
      usage: "slot",
      aliases: []
    });
  }

  async run(message) {
    const client = this.client;
    const slot1 = slots[Math.floor(Math.random() * slots.length)];
    const slot2 = slots[Math.floor(Math.random() * slots.length)];
    const slot3 = slots[Math.floor(Math.random() * slots.length)];
    const slot4 = slots[Math.floor(Math.random() * slots.length)];
    const slot5 = slots[Math.floor(Math.random() * slots.length)];
    const slot6 = slots[Math.floor(Math.random() * slots.length)];
    const slot7 = slots[Math.floor(Math.random() * slots.length)];
    const slot8 = slots[Math.floor(Math.random() * slots.length)];
    const slot9 = slots[Math.floor(Math.random() * slots.length)];
    if (slot4 === slot5 && slot4 === slot6) {
      var kazandin = new Discord.RichEmbed()
        .setDescription(
          `
        **[  :slot_machine: | SLOTS ]**
        ------------------
     ${slot1}  |  ${slot2}  |  ${slot3}\n
      ${slot4}  |  ${slot5}  |  ${slot6}  **<**\n
      ${slot7}  |  ${slot8}  |  ${slot9}
      ------------------
      **| : : : :** Gagnez **: : : : |**
      `
        )

        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      return message.channel.send(kazandin);
    }
    if (slot4 === slot5 || slot4 === slot6 || slot5 === slot6) {
      kazandin = new Discord.RichEmbed()
        .setDescription(
          `
        **[  :slot_machine: | SLOTS ]**
        ------------------
     ${slot1}  |  ${slot2}  |  ${slot3}\n
      ${slot4}  |  ${slot5}  |  ${slot6}  **<**\n
      ${slot7}  |  ${slot8}  |  ${slot9}
      ------------------
      **| : : : :** Gagnez **: : : : |**
      `
        )
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      return message.channel.send(kazandin);
    } else {
      kazandin = new Discord.RichEmbed()
        .setDescription(
          `
      **[  :slot_machine: | SLOTS ]**
      ------------------
   ${slot1}  |  ${slot2}  |  ${slot3}\n
    ${slot4}  |  ${slot5}  |  ${slot6}  **<**\n
    ${slot7}  |  ${slot8}  |  ${slot9}
    ------------------
    **| : : : :** Perdu **: : : : |**
    `
        )
        .setColor(0x36393f)
        .setTimestamp(new Date())
        .setFooter(client.user.username, client.user.avatarURL);
      return message.channel.send(kazandin);
    }
  }
}

module.exports = slot;
