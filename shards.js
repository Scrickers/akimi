const { ShardingManager } = require("discord.js");
const config = require("./configs");
const LOGGER = require("./src/utils/logger");
const logger = new LOGGER();
var loaded = false;
const debug = false;

const sharder = new ShardingManager("./index.js", {
  token: config.BOT_TOKEN,
  totalShards: "auto" 
});

sharder.on("launch", (shard) => {
  logger.log(`Sharding | Shard #${shard.id} lancé !`);
});

sharder.spawn();
sharder.on("launch", function(shard) {
  if (!loaded && shard.id == sharder.totalShards - 1) {
    loaded = true;
    setTimeout(updateActivity, 15000);
  }
});
function updateActivity() {
  console.log("Sharding | Tous les shards sont lancés !");
  if (!debug)
    sharder.broadcastEval(
      "this.shard.fetchClientValues('guilds.size').then(results => {var result = results.reduce((prev, val) => prev + val, 0);this.user.setActivity(`*help || ${result}  serveur`)}).catch(err => console.error(err))"
    );
}