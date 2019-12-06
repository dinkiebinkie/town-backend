// helper functions ...?
const uuidv1 = require("uuid/v1");
const bots = require("./bots");
const naughtyWords = require("./data/naughtyWords");

// set timeout for next action/tweet
function setTimer(id) {
  const thisBot = bots.find(bot => bot.id === id);
  const botTimer = thisBot.timer;

  // convert timer to MS
  // random number between 70% - 130% of config timer set from bots.js
  const timer = (Math.random() * (1.3 - 0.7) + 0.7) * 60 * 60 * 1000 * botTimer;
}

// tweet filter
// filter words from tweets - if it is a bad word don't tweet
function isTweetNaughty(tweet) {
  const str = tweet.tweet.toLowerCase();

  for (let i = 0; i < naughtyWords.length; i++) {
    const tweetIsNaughty = str.includes(naughtyWords[i]);

    if (tweetIsNaughty) {
      console.log("tweet is naughty 🙀 ", str, "... Getting new tweet");
      return true;
    }
  }

  return false;
}

function generateRandomID() {
  return uuidv1();
}
