const express = require("express");
const router = express.Router();
const CheckAuth = require("../auth/CheckAuth");

router.get("/", async (req, res) => {
  res.render("index.ejs", {
      status: req.isAuthenticated()
        ? `${req.user.username}#${req.user.discriminator}`
        : "Se connecter",
      client: req.bot.user,
      member: req.bot.users.size,
      guild: req.bot.guilds.size,
      user: req.user,
      login: req.isAuthenticated() ? "oui" : "non",
      invite: `https://discordapp.com/oauth2/authorize?client_id=${
        req.bot.user.id
      }&scope=bot&permissions=-1`
    });
  })

module.exports = router;
