const Airtable = require("airtable");
const utility = require("../utility");

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_API_KEY
});

const fetchFirstPageOfTweets = (airtable_base, bot_name_url) => {
  return new Promise((res, rej) => {
    const base = Airtable.base(airtable_base);

    const tweetsArray = [];

    base(bot_name_url)
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
  });
};

const addTweetsToAirtable = (airtable_base, bot_id, mlTweets) => {
  return new Promise((res, rej) => {
    const base = Airtable.base(airtable_base);
    console.log(new Date());
    const reformattedMlTweets = mlTweets.map(newTweet => {
      return {
        fields: {
          tweet_id: utility.generateRandomID(),
          tweet: newTweet,
          bot_id: bot_id,
          time_created: new Date()
        }
      };
    });
    console.log(reformattedMlTweets);

    // base('inspirational_quotes').create([
    //   {
    //     "fields": {
    //       "tweet_id": "1",
    //       "tweet": "Test Tweet! tweet tweet",
    //       "job_id": "1",
    //       "bot_id": "1",
    //       "time_created": "2019-12-06T00:00:00.000Z"
    //     }
    //   },
    //   {
    //     "fields": {
    //       "tweet_id": "1",
    //       "tweet": "Test Tweet! tweet tweet",
    //       "job_id": "1",
    //       "bot_id": "1",
    //       "time_created": "2019-12-06T00:00:00.000Z"
    //     }
    //   }
    // ], function(err, records) {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   records.forEach(function (record) {
    //     console.log(record.getId());
    //   });
    // });
    // const base = Airtable.base(airtable_base);

    // const tweetsArray = [];

    // base(bot_name_url)
    //   .select({
    //     view: "Grid view"
    //   })
    //   .firstPage(function(err, records) {
    //     if (err) {
    //       console.error(err);
    //       rej(err);
    //     }
    //     records.forEach(function(record) {
    //       // console.log("Retrieved", record.get("tweet"));
    //       tweetsArray.push(record.get("tweet"));
    //     });
    //     res(tweetsArray);
    //   });
  });
};

exports.fetchFirstPageOfTweets = fetchFirstPageOfTweets;
exports.addTweetsToAirtable = addTweetsToAirtable;
