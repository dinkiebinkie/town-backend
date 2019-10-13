module.exports = [
  {
    bot_id: 0,
    bot_name: "test bot",
    description: "I am a test! YOLO",
    tweet_beginnings: [],
    bot_type: "twitter",
    bot_url: "https://twitter.com/testbot", // where does the bot live
    number_of_likes: 200, // how many tweets does the bot like a day
    ml_notebook: "path/of/ML", // who's ur daddy botty boy
    tweet_storage_length: 100, // how many tweets are requested if it's running low
    timer: 12, // how long (hours) until next tweet? variation of 75-125%
    hashtags: [], // any hashtags you think the bot should include if the tweet is short enough
    hashtagPercentage: 75 // % of the time you think the bot should send a tweet
  }
];
