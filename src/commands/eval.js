"use strict";

const Command = require("../structures/Command");

class Eval extends Command {
  constructor(client) {
    super(client, {
      name: "eval",
      description: "Evalue un code",
      category: ":wrench: dev",
      usage: "eval <code>",
      aliases: ["e"]
    });
  }

  async run(message, args) {
    function clean(text) {
      if (typeof text === "string")
        return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    }

    if (message.author.id !== this.client.config.OWNER_ID) {
      return message.channel.send(
        "⚠ Tu n'as pas les permissions suffisantes pour exécuter cette commande."
      );
    }
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), { code: "xl" });
    } catch (err) {
      message.channel.send(`\`ERREUR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
}

module.exports = Eval;
