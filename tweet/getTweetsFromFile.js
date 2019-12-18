const config = require("../config");

module.exports = async function getTweetsFromFile(bot_id, numberOfTweets) {
  return new Promise((res, rej) => {
    let tweets = [];
    let lineIndex = 0;
    console.log(config.testTweeting);
    const lineReader = require("readline").createInterface({
      input: require("fs").createReadStream(
        config.testTweeting
          ? `./data/tweets_txt/test.txt`
          : `./data/tweets_txt/${bot_id}.txt`
      )
    });

    lineReader
      .on("line", line => {
        tweets.push(line);
        lineIndex++;
        if (lineIndex >= numberOfTweets) {
          lineReader.close();
          lineReader.removeAllListeners();
        }
      })
      .on("close", () => {
        res(tweets);
      });
  });
};
