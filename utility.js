// helper functions ...?
const uuidv4 = require("uuid/v4");
const bots = require("./data/bots");
// const naughtyWords = require("./data/naughtyWords");

// tweet filter
// filter words from tweets - if it is a bad word don't tweet
// function isTweetNaughty(tweet) {
//   const str = tweet.tweet.toLowerCase();

//   for (let i = 0; i < naughtyWords.length; i++) {
//     const tweetIsNaughty = str.includes(naughtyWords[i]);

//     if (tweetIsNaughty) {
//       console.log("tweet is naughty 🙀 ", str, "... Getting new tweet");
//       return true;
//     }
//   }

//   return false;
// }

function generateRandomID() {
  return uuidv4();
}

// async function getTweetsFromFile(bot_id) {
//   return new Promise((res, rej) => {
//     const tweets = [];
//     let lineIndex = 0;

//     const lineReader = require("readline").createInterface({
//       input: require("fs").createReadStream(`./data/tweets_txt/${bot_id}.txt`)
//     });

//     lineReader
//       .on("line", line => {
//         console.log("line", line);

//         tweets.push(line);
//         lineIndex++;
//         if (lineIndex >= 100) {
//           lineReader.close();
//           res(tweets);
//         }
//       })
//       .on("close", line => res(tweets));
//   });
// }

exports.generateRandomID = generateRandomID;
// exports.getTweetsFromFile = getTweetsFromFile;
