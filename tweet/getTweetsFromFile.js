module.exports = async function getTweetsFromFile(bot_id, numberOfTweets) {
  return new Promise((res, rej) => {
    let tweets = [];
    let lineIndex = 0;

    const lineReader = require("readline").createInterface({
      input: require("fs").createReadStream(`./data/tweets_txt/${bot_id}.txt`)
    });

    lineReader
      .on("line", line => {
        if (numberOfTweets === 1) {
          tweets = line;
          lineReader.close();
          lineReader.removeAllListeners();
        } else {
          tweets.push(line);
          lineIndex++;
          if (lineIndex >= numberOfTweets) {
            lineReader.close();
            lineReader.removeAllListeners();
          }
        }
      })
      .on("close", () => {
        res(tweets);
      });
  });
};
