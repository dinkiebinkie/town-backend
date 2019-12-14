const express = require("express");
const router = express.Router();
const bots = require("../data/bots");
const airtable = require("../database/airtable");
const config = require("../config");
const getTweetsFromFile = require("../tweet/getTweetsFromFile");
const getTweetToTweet = require("../tweet/getTweetToTweet");

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
      : await getTweetToTweet(bot_id);

    console.log("retreived then deleted tweet from file,");

    return res.send(bot.bot_name, "<br/>", tweet);
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
