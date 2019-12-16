const bots = require("../data/bots");
const Twitter = require("twitter");
module.exports = async function tellTwitterToTweet(tweet, bot_id) {
  return new Promise((res, rej) => {
    // find this bot in bot array
    const bot = bots.find(thisBot => thisBot.bot_id === bot_id);

    // pick random hashtag from bot to like
    const q = bot.hashtags[Math.floor(Math.random() * bot.hashtags.length)];

    const T = new Twitter(bot.authentication);

    const likeParams = {
      q: q,
      count: bot.number_of_likes_per_tweet,
      result_type: "recent",
      lang: "en"
    };

    T.get("search/tweets", likeParams, (err, data, response) => {
      if (!err) {
        for (let i = 0; i < data.statuses.length; i++) {
          // Get the tweet Id from the returned data
          let id = { id: data.statuses[i].id_str };
          // Try to Favorite the selected Tweet
          T.post("favorites/create", id, (err, response) => {
            // If the favorite fails, log the error message
            if (err) {
              console.log(err[0].message);
            }
            // If the favorite is successful, log the url of the tweet
            else {
              let username = response.user.screen_name;
              let tweetId = response.id_str;

              console.log(
                "Favorited: ",
                `https://twitter.com/${username}/status/${tweetId}`
              );
              res(
                "Favorited: ",
                `https://twitter.com/${username}/status/${tweetId}`
              );
            }
          });
        }
      } else {
        console.log(err);
      }
    });

    const tweetParams = {
      status: tweet,
      lang: "en"
    };

    T.post("statuses/update", tweetParams, (err, data, response) => {
      console.log("responseresponseresponseresponse", response.status);

      if (!err) {
        console.log("successfully tweeted", tweet);
        res(tweet);
      } else {
        console.log(err);
      }
    });
  });
};
