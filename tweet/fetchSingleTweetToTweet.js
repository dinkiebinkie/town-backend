const fs = require("fs");
const config = require("../config");

module.exports = async function getTweetToTweet(bot_id) {
  return new Promise((res, rej) => {
    const fileToRead = config.testTweeting
      ? `./data/tweets_txt/test.txt`
      : `./data/tweets_txt/${bot_id}.txt`;

    fs.readFile(fileToRead, "utf8", (err, data) => {
      if (err) rej("getTweetToTweet err", err);
      const lines = data.split("\n");
      const firstLine = lines[0];
      const linesExceptFirst = lines.slice(1).join("\n");

      fs.writeFile(fileToRead, linesExceptFirst, (err, result) => {
        if (err) rej("getTweetToTweet err", err);
        return res(firstLine);
      });
    });
  });
};
