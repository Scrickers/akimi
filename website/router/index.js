const express = require("express");
const router = express.Router();
const passport = require("passport");

router
  .get("/", function(req, res) {
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
  .get(
    "/login",
    passport.authenticate("discord", { failureRedirect: "/" }),
    function(req, res) {
      res.redirect("/profile");
    }
  )
  .get("/logout", async function(req, res) {
    await req.logout();
    await res.redirect("/");
  });

module.exports = router;
