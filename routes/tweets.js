const express = require("express");
const router = express.Router();
const bots = require("../data/bots");
const airtable = require("../database/airtable");
const config = require("../config");
const getTweetsFromFile = require("../tweet/getTweetsFromFile");
const fetchSingleTweetToTweet = require("../tweet/fetchSingleTweetToTweet");
const tellTwitterToTweet = require("../tweet/tellTwitterToTweet");

// This file is for getting tweets form the DB
// If there are no tweets in the DB fetch from ML

router.get("/", (req, res) => {
  const botNames = [];
  bots.forEach(bot => botNames.push(bot.bot_name));
  res.send(
    `here are all of the bots we got yolo <br/>` + botNames.join("<br/>")
  );
});

bots.forEach(bot => {
  // connection to DB
  const bot_id = bot.bot_id;
  const bot_name = bot.bot_name;
  // fetch all tweets from DB for showing on page
  router.get(`/${bot_id}`, async (req, res) => {
    // fetch tweeets
    console.log(`fetching tweets for ${bot_id}`);

    const listOfTweets = config.databaseIsOn
      ? await airtable.fetchFirstPageOfTweets(bot.airtable_base, bot_id)
      : await getTweetsFromFile(bot_id, 100);

    return res.send(bot_name + "<br/> " + listOfTweets.join("<br/>"));
  });

  // Get a tweet then tweet it
  router.get(`/${bot_id}/tweet`, async (req, res) => {
    // first fetch tweets from DB or file
    const tweet = config.databaseIsOn
      ? await airtable.fetchFirstPageOfTweets(bot.airtable_base, bot_id)
      : await fetchSingleTweetToTweet(bot_id);

    // Send tweet to twitter bot to tweet
    const pleaseTweet = await tellTwitterToTweet(tweet, bot_id);

    console.log(pleaseTweet);

    return res.send(bot.bot_name + "<br/>" + pleaseTweet);
  });

  // if (config.databaseIsOn) {
  //   console.log('database is on')
  // } else {
  //   console.log('database is off')

  // }

  // add tweets to DB
  // router.get(`/add-new-tweets/${bot_id}`, async (req, res) => {
  //   // fetch ml generated tweeets
  //   // const mlTweets = await fetchMlTweets();
  //   const mlTweets = [
  //     "hello etst tweet",
  //     "hello etst tweet",
  //     "hello etst tweet"
  //   ];

  //   // push new tweets to db
  //   const sendTweetsToDB = await airtable.addTweetsToAirtable(
  //     bot.airtable_base,
  //     bot_id,
  //     mlTweets
  //   );

  //   return res.send(bot_name + "<br/> " + listOfTweets.join("<br/>"));
  // });
});

module.exports = router;
