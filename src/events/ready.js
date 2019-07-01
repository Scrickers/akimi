const Event = require("../structures/Event");
const axios = require("axios");
class Ready extends Event {
  constructor(args) {
    super(args, {
      name: "Ready"
    });
  }

  async run() {
    const client = this.client;

    if (!client.user.bot) {
      return process.exit(0);
    }
    await client.website.load(client);
    await new Promise(resolve => setTimeout(resolve, 1000));

    axios.post(
      "https://discordbotlist.com/api/bots/488046002784305156/stats",
      {
        shard_id: 0,
        guilds: client.guilds.size,
        users: client.users.size,
        voice_connections: client.voiceConnections.size
      },
      {
        headers: {
          Authorization: `Bot ${process.env.DBL_TOKEN}`
        }
      }
    );
  }
}

module.exports = Ready;
