const airtable = require("../database/airtable");
const fetchSingleTweetToTweet = require("./fetchSingleTweetToTweet");
const tellTwitterToTweet = require("./tellTwitterToTweet");
const timers = require("./timerStuff");
const config = require("../config");
const bots = require("../data/bots");

module.exports = async function fetchTweetThenTweet(bot_id) {
  const bot = bots.find(currentBot => currentBot.bot_id === bot_id);
  // first fetch tweets from DB or file
  const tweet = config.databaseIsOn
    ? await airtable.fetchFirstPageOfTweets(bot.airtable_base, bot_id)
    : await fetchSingleTweetToTweet(bot_id);

  // Send tweet to twitter bot to tweet
  const pleaseTweet = await tellTwitterToTweet(tweet, bot_id);
  console.log(pleaseTweet);

  timers.restartTimer(bot);

  return pleaseTweet;
};
