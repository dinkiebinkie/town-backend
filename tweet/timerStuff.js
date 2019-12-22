const bots = require("../data/bots");
const fetchTweetThenTweet = require("./fetchTweetThenTweet");

const startTimers = () => {
  return bots.forEach(bot => {
    fetchTweetThenTweet(bot.bot_id);
    // first tweet, then run the timeout
    return restartTimer(bot);
  });
};

const restartTimer = bot => {
  const rn =
    Math.random() * (bot.timer * 1.5 - bot.timer * 0.5) + bot.timer * 0.5;
  console.log("setting timer for " + rn + " times for bot " + bot.bot_id);
  return setTimeout(fetchTweetThenTweet, rn, bot.bot_id);
};

exports.startTimers = startTimers;
exports.restartTimer = restartTimer;
