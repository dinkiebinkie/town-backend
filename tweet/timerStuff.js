const bots = require("../data/bots");
const fetchTweetThenTweet = require("./fetchTweetThenTweet");

const startTimers = () => bots.forEach(bot => restartTimer(bot));

const restartTimer = bot => {
  const rn =
    Math.random() * (bot.timer * 1.5 - bot.timer * 0.5) + bot.timer * 0.5;
  return setTimeout(fetchTweetThenTweet, rn, bot.bot_id);
};

exports.startTimers = startTimers;
exports.restartTimer = restartTimer;
