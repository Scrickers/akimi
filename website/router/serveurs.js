const express = require("express");
const router = express.Router();
const CheckAuth = require("../auth/CheckAuth");

router
  .get("/:guildID", CheckAuth, (req, res) => {
    const serv = req.bot.guilds.get(req.params.guildID);
    if (!serv)
      return res.redirect(
        `https://discordapp.com/oauth2/authorize?client_id=${
          req.bot.user.id
        }&scope=bot&permissions=-1&guild_id=${req.params.guildID}`
      );
    if (
      !req.bot.guilds
        .get(req.params.guildID)
        .members.get(req.user.id)
        .hasPermission("MANAGE_GUILD")
    )
      return res.redirect("/dashboard");
    res.render("guild.ejs", {
      status: req.isAuthenticated()
        ? `${req.user.username}#${req.user.discriminator}`
        : "Se connecter",
      client: req.bot.user,
      user: req.user,
      avatarURL: `https://cdn.discordapp.com/avatars/${req.user.id}/${
        req.user.avatar
      }.png`,
      iconURL: `https://cdn.discordapp.com/avatars/${req.user.id}/${
        req.user.avatar
      }.png?size=32`,
      prefix: req.bot.setting.get(`${req.params.guildID}`, "prefix"),
      guild: serv
    });
  })
  .post("/:guildID", CheckAuth, async function(req, res) {
    console.log(req.body.send_MESSAGE);
    await res.client.setting.set(`${req.params.guildID}`, req.body.send_MESSAGE, "prefix");
    await res.redirect(`/serveurs/${req.params.guildID}`);
   
  });
    
module.exports = router;
