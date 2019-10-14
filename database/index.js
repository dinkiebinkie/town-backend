const models = require("./models");
const config = require("./../config");
const sequelize = require("sequelize");

const noOpPromise = function() {
  return new Promoise(function(resolve, reject) {
    process.nextTick(() => {
      console.log("We is in a NOOP Brudda");
      resolve(null);
    });
  });
};

const createJob = function(param) {
  if (!config.databaseIsOn) {
    return noOpPromise();
  }

  return models.Job.create({
    time_stamp: param.time_stamp,
    time_stamp_date: param.time_stamp_date,
    status: param.status || "success",
    total_tweets_generated: param.total_tweets_generated || 0
  });
};

const fetchLastSeventyTwoHoursOfTweets = function() {
  if (!config.databaseIsOn) {
    return noOpPromise();
  }

  return models.Tweets.findAll({
    where: {
      time_created: {
        [sequelize.Op.gt]: moment.subtract(3, "days").toDate()
      }
    },
    order: [["time_created", "DESC"]]
  });
};


const createBot = function(param) {
  if (!config.databaseIsOn) {
    return noOpPromise();
  }

  return models.Bot.create({
    bot_name: param.bot_name,
    description: param.description,
    tweet_beginnings: param.tweet_beginnings,
    bot_type: param.bot_type,
    bot_url: param.bot_url, // where does the bot live
    number_of_likes_per_tweet: param.number_of_likes_per_tweet, // how many tweets does the bot like when it tweets
    ml_notebook: param.ml_notebook, // who's ur daddy botty boy
    tweet_storage_length: param.tweet_storage_length, // how many tweets are requested if it's running low
    timer: param.timer, // how long (hours) until next tweet? variation of 75-125%
    hashtags: param.hashtags, // any hashtags you think the bot should include if the tweet is short enough or for favoriting
    hashtagPercentage: param.hashtagPercentage, // % of the time you think the bot should send a tweet
    authentication: param.authentication,
    videoUrl: param.videoUrl// video related to this bot on my YT channel xSZ);
  }
);

exports.noOpPromise = noOpPromise;
exports.createJob = createJob;
exports.fetchLastSeventyTwoHoursOfTweets = fetchLastSeventyTwoHoursOfTweets;
