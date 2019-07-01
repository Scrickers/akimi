/* eslint-disable indent */
/**
 * @fileOverview File with important functions for the bot
 * */

var PREFIX = "*";
var EXPERIMENTAL = 0;

/**
 * Function which connects you to the web radio and plays music
 *
 * @param {GuildChannel} voiceChannel - Voice Channel
 * @param {Message} msg - Message
 * @param {String} radioType - Which radio is playing now?
 * @param {String} streamLink - Stream link to the radio
 */
exports.playRadio = (voiceChannel, msg, radioType, streamLink) => {
  if (
    msg.guild.voiceConnection &&
    msg.member.voiceChannel.id === msg.guild.voiceConnection.channel.id
  ) {
    let userLimit;
    if (voiceChannel.userLimit === 0) {
      userLimit = "unlimited";
    } else {
      userLimit = voiceChannel.userLimit;
    }

    // logging channel data
    console.log(`\nSwitching the radio on a server. Here is some data:\n 
          Radio type: ${radioType}\n
          Channel name: ${voiceChannel.name}\n 
          userLimit: ${userLimit}\n 
          guild: ${voiceChannel.guild.name}\n 
          guildId: ${voiceChannel.guild.id}\n
          membercount (guild): ${voiceChannel.guild.memberCount}\n
          current amount of people in the same channel: ${voiceChannel.members
            .size - 1}`);

    // Sending a response that the bot is now playing the music
    msg.channel.send(
      `En cours de lecture ** ${radioType} **! Si je ne joue pas de musique, tapez simplement la commande \`\` ${PREFIX} radio \`\`. :wink:`
    );

    // This message will be send if the bot is currently under an experimental mode or under maintenance
    if (EXPERIMENTAL === "1") {
      msg.channel.send(
        "**This bot is currently on the EXPERIMENTAL MODE which means that it could happen the bot stops playing music.** \n" +
          "You can see if the bot is in this mode when it is in the idle (orange dot at the profile pic) mode. \n" +
          "When the bot is on 'online' (this green dot at the profile pic), it means the bot can be used without any upcoming issues."
      );
    }

    // Playing the music!!!
    // eslint-disable-next-line no-unused-vars
    const dispatcher = msg.guild.voiceConnection.playStream(`${streamLink}`, {
      volume: 0.3
    });
  } else {
    // If the user is in a channel
    if (voiceChannel) {
      // Then try to join his channel
      voiceChannel
        .join()
        // eslint-disable-next-line no-unused-vars
        .then(connection => {
          // User limit property from the voice channel
          let userLimit;
          if (voiceChannel.userLimit === 0) {
            userLimit = "unlimited";
          } else {
            userLimit = voiceChannel.userLimit;
          }

          // logging channel data
          console.log(`\nJoined a channel and now playing iLoveRadio! Here is some data:\n 
          Radio type: ${radioType}\n
          Channel name: ${voiceChannel.name}\n 
          userLimit: ${userLimit}\n 
          guild: ${voiceChannel.guild.name}\n 
          guildId: ${voiceChannel.guild.id}\n
          membercount (guild): ${voiceChannel.guild.memberCount}\n
          current amount of people in the same channel: ${voiceChannel.members
            .size - 1}`);

          // Sending a response that the bot is now playing the music
          msg.channel.send(
            `En cours de lecture ** ${radioType} **! Si je ne joue pas de musique, tapez simplement la commande \`\` ${PREFIX} radio \`\`. :wink:`
          );

          // This message will be send if the bot is currently under an experimental mode or under maintenance
          if (EXPERIMENTAL === "1") {
            msg.channel.send(
              "**This bot is currently on the EXPERIMENTAL MODE which means that it could happen the bot stops playing music.** \n" +
                "You can see if the bot is in this mode when it is in the idle (orange dot at the profile pic) mode. \n" +
                "When the bot is on 'online' (this green dot at the profile pic), it means the bot can be used without any upcoming issues."
            );
          }

          // Playing the music!!!
          // eslint-disable-next-line no-unused-vars
          const dispatcher = msg.guild.voiceConnection.playStream(
            `${streamLink}`,
            {
              volume: 0.3
            }
          );

          // Or catch any error
        })
        .catch(e => {
          // Error message
          msg.channel.send(
            `Je ne peux pas rejoindre votre canal vocal. (${e})`
          );
          console.log(e);
        });
    } else {
      msg.reply("vous devez d'abord rejoindre un canal vocal!").catch(e => {
        console.log(`${msg.guild.name} -> Error appeared: ${e}`);
      });
    }
  }
};
