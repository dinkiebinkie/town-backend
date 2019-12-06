const express = require("express");
const router = express.Router();
const Twitter = require("twitter");
const bots = require("../data/bots");

router.get("/", (req, res) => {
  const T = new Twitter(bots.futuristic_baby_names.authentication);
  const params = {
    q: "#nodejs",
    count: 10,
    result_type: "recent",
    lang: "en"
  };
  T.get("search/tweets", params, function(err, data, response) {
    if (!err) {
      for (let i = 0; i < data.statuses.length; i++) {
        // Get the tweet Id from the returned data
        let id = { id: data.statuses[i].id_str };
        // Try to Favorite the selected Tweet
        T.post("favorites/create", id, function(err, response) {
          // If the favorite fails, log the error message
          if (err) {
            console.log(err[0].message);
          }
          // If the favorite is successful, log the url of the tweet
          else {
            let username = response.user.screen_name;
            let tweetId = response.id_str;
            console.log(
              "Favorited: ",
              `https://twitter.com/${username}/status/${tweetId}`
            );
          }
        });
      }
    } else {
      console.log(err);
    }
  });

  return res.send(`tweet tweet bud`);
});

module.exports = router;
