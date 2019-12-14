const express = require("express");
const router = express.Router();
const bots = require("../data/bots");
const airtable = require("../database/airtable");
const config = require("../config");
const getTweetsFromFile = require("../tweet/getTweetsFromFile");

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
      : await getTweetsFromFile(bot_id);

    return res.send(bot_name + "<br/> " + listOfTweets.join("<br/>"));
  });

  // add tweets to DB
  router.get(`/add-new-tweets/${bot_id}`, async (req, res) => {
    // fetch ml generated tweeets
    // const mlTweets = await fetchMlTweets();
    const mlTweets = [
      "hello etst tweet",
      "hello etst tweet",
      "hello etst tweet"
    ];

    // push new tweets to db
    const sendTweetsToDB = await airtable.addTweetsToAirtable(
      bot.airtable_base,
      bot_id,
      mlTweets
    );

    return res.send(bot_name + "<br/> " + listOfTweets.join("<br/>"));
  });

  // Get a tweet from DB
  // router.get(`/tweet/${bot_id}`, (req, res) => {
  //   const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  //     bot.airtable_base
  //   );
  //   // first fetch tweets from DB

  //   // Check Length of Tweets

  //   // Display tweets
  //   return res.send(bot.bot_name);
  // });
});

module.exports = router;

// const T = new Twitter(bots.futuristic_baby_names.authentication);
//   const params = {
//     q: "#nodejs",
//     count: 10,
//     result_type: "recent",
//     lang: "en"
//   };
//   T.get("search/tweets", params, function(err, data, response) {
//     if (!err) {
//       for (let i = 0; i < data.statuses.length; i++) {
//         // Get the tweet Id from the returned data
//         let id = { id: data.statuses[i].id_str };
//         // Try to Favorite the selected Tweet
//         T.post("favorites/create", id, function(err, response) {
//           // If the favorite fails, log the error message
//           if (err) {
//             console.log(err[0].message);
//           }
//           // If the favorite is successful, log the url of the tweet
//           else {
//             let username = response.user.screen_name;
//             let tweetId = response.id_str;
//             console.log(
//               "Favorited: ",
//               `https://twitter.com/${username}/status/${tweetId}`
//             );
//           }
//         });
//       }
//     } else {
//       console.log(err);
//     }
//   });
