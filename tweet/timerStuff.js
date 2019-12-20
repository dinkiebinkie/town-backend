const bots = require("../data/bots");
const fetchTweetThenTweet = require("./fetchTweetThenTweet");

const startTimers = () => {
  setInterval(console.log("keeping server alive... i think?"), 1800000);
  return bots.forEach(bot => restartTimer(bot));
};

const restartTimer = bot => {
  const rn =
    Math.random() * (bot.timer * 1.5 - bot.timer * 0.5) + bot.timer * 0.5;
  console.log("setting timer for " + rn + "times for bot" + bot.bot_id);
  return setTimeout(fetchTweetThenTweet, rn, bot.bot_id);
};

exports.startTimers = startTimers;
exports.restartTimer = restartTimer;
