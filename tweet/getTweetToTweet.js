const fs = require("fs");
module.exports = async function getTweetToTweet(bot_id) {
  return new Promise((res, rej) => {
    fs.readFile(`./data/tweets_txt/${bot_id}.txt`, "utf8", (err, data) => {
      if (err) rej("getTweetToTweet err", err);
      const lines = data.split("\n");
      const firstLine = lines[0];
      const linesExceptFirst = lines.slice(1).join("\n");

      fs.writeFile(
        `./data/tweets_txt/${bot_id}.txt`,
        linesExceptFirst,
        (err, result) => {
          if (err) rej("getTweetToTweet err", err);
          return res(firstLine);
        }
      );
    });
  });
};
