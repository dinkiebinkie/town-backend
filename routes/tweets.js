const express = require("express");
const router = express.Router();
const Twitter = require("twitter");
const bots = require("../data/bots");
const Airtable = require("airtable");

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_API_KEY
});

// This file is for getting tweets form the DB
// If there are no tweets in the DB fetch from ML

router.get("/", (req, res) => {
  const botNames = [];
  bots.forEach(bot => botNames.push(bot.bot_name));
  res.send(
    `here are all of the bots we got yolo <br/>` + botNames.join("<br/>")
  );
});

const fetchFirstPageOfTweets = (airtable_base, bot_name_url) => {
  return new Promise((res, rej) => {
    const base = Airtable.base(airtable_base);

    const tweetsArray = [];
    console.log("in promise");
    console.log(base);
    base("inspirational_quotes")
      .select({
        view: "Grid view"
      })
      .firstPage(function(err, records) {
        if (err) {
          console.error(err);
          rej(err);
        }
        records.forEach(function(record) {
          // console.log("Retrieved", record.get("tweet"));
          tweetsArray.push(record.get("tweet"));
        });
        res(tweetsArray);
      });
    // base(bot_name_url)
    //   .select({
    //     // Selecting the first 3 records in Grid view:
    //     maxRecords: 3,
    //     view: "Grid view"
    //   })
    //   .eachPage(
    //     function page(records, fetchNextPage) {
    //       // This function (`page`) will get called for each page of records.
    //       records.forEach(record => {
    //         const tweet = record.get("tweet");
    //         console.log(tweet);
    //         tweetsArray.push(tweet);
    //       });

    //       // To fetch the next page of records, call `fetchNextPage`.
    //       // If there are more records, `page` will get called again.
    //       // If there are no more records, `done` will get called.
    //       // fetchNextPage();
    //     },
    //     function done(err) {
    //       if (err) {
    //         console.error("errorrederd out", err);
    //         rej(err);
    //       }
    //       console.log("tweets Array", tweetsArray);
    //       res(tweetsArray);
    //     }
    //   );
  });
};

bots.forEach(bot => {
  // connection to DB
  const bot_name_url = bot.bot_name_url;
  const bot_name = bot.bot_name;
  // fetch all tweets from DB for showing on page
  router.get(`/${bot_name_url}`, async (req, res) => {
    // fetch inspirational quotes
    const listOfTweets = await fetchFirstPageOfTweets(
      bot.airtable_base,
      bot_name_url
    );
    console.log("listOfTweets", listOfTweets);
    return res.send(bot_name + "<br/> " + listOfTweets.join("<br/>"));
  });

  // Get a tweet from DB
  // router.get(`/tweet/${bot_name_url}`, (req, res) => {
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
