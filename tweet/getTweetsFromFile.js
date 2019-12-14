module.exports = async function getTweetsFromFile(bot_id) {
  return new Promise((res, rej) => {
    const tweets = [];
    let lineIndex = 0;

    const lineReader = require("readline").createInterface({
      input: require("fs").createReadStream(`./data/tweets_txt/${bot_id}.txt`)
    });

    lineReader
      .on("line", line => {
        tweets.push(line);
        lineIndex++;
        if (lineIndex >= 100) {
          lineReader.close();
          lineReader.removeAllListeners();
        }
      })
      .on("close", () => {
        res(tweets);
      });
  });
};
