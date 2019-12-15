module.exports = [
  {
    bot_id: "futuristic_baby_names",
    bot_name: "Futuristic Baby Names",
    tweet_beginnings: [],
    bot_type: "twitter",
    bot_url: "https://twitter.com/BabyFuturistic/", // where does the bot live
    number_of_likes_per_tweet: 20, // how many tweets does the bot like when it tweets
    ml_notebook: "path/of/ML", // who's ur daddy botty boy
    tweet_storage_length: 1000, // how many tweets are requested if it's running low
    timer: 10, // how long (hours) until next tweet? variation of 75-125%
    hashtags: ["binkie", "baby"], // any hashtags you think the bot should include if the tweet is short enough or for favoriting
    hashtagPercentage: 75, // % of the time you think the bot should send a tweet
    authentication: {
      consumer_key: process.env.TWITTER_API_KEY_FUTURISTIC_BABY_NAMES,
      consumer_secret: process.env.TWITTER_API_SECRET_KEY_FUTURISTIC_BABY_NAMES,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_FUTURISTIC_BABY_NAMES,
      access_token_secret:
        process.env.TWITTER_ACCESS_TOKEN_SECRET_FUTURISTIC_BABY_NAMES
    },
    videoUrl: "" // video related to this bot on my YT channel xSZ
  },
  {
    bot_id: "inspirational_quotes",
    bot_name: "Inspirational Quotes",
    tweet_beginnings: [],
    bot_type: "twitter",
    bot_url: "https://twitter.com/InspirationalQuotes/", // where does the bot live
    number_of_likes_per_tweet: 20, // how many tweets does the bot like when it tweets
    ml_notebook: "path/of/ML", // who's ur daddy botty boy
    tweet_storage_length: 1000, // how many tweets are requested if it's running low
    timer: 10, // how long (hours) until next tweet? variation of 75-125%
    hashtags: ["binkie", "baby"], // any hashtags you think the bot should include if the tweet is short enough or for favoriting
    hashtagPercentage: 75, // % of the time you think the bot should send a tweet
    authentication: {
      consumer_key: process.env.TWITTER_API_KEY_INSPIRATIONAL_QUOTES,
      consumer_secret: process.env.TWITTER_API_SECRET_KEY_INSPIRATIONAL_QUOTES,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_INSPIRATIONAL_QUOTES,
      access_token_secret:
        process.env.TWITTER_ACCESS_TOKEN_SECRET_INSPIRATIONAL_QUOTES
    },
    videoUrl: "", // video related to this bot on my YT channel xSZ
    airtable_base: "app4EtGrcZkFCVsk0"
  }
];
