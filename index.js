// imports
const express = require("express");
require("dotenv").config();
const config = require("./config");
// const path = require("path");
const Twitter = require("twitter");
const bots = require("./data/bots");

// constants
const instaClientId = process.env.INSTAGRAM_CLIENT_ID;
const instaAccessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
const binkieId = process.env.BINKIE_ID;

// Setting up app
const port = config.port;
const app = express();

// routes
const index = require("./routes/index");
const tweets = require("./routes/tweets");
const botsRoute = require("./routes/bots");

app.use("/", index);
app.use("/tweets", tweets);
app.use("/bots", botsRoute);

const T = new Twitter(bots.futuristic_baby_names.authentication);
const params = {
  q: "#nodejs",
  count: 10,
  result_type: "recent",
  lang: "en"
};
// T.get("search/tweets", params, function(err, data, response) {
//   if (!err) {
//     for (let i = 0; i < data.statuses.length; i++) {
// Get the tweet Id from the returned data
// let id = { id: data.statuses[i].id_str };
// Try to Favorite the selected Tweet
// T.post("favorites/create", id, function(err, response) {
//   // If the favorite fails, log the error message
//   if (err) {
//     console.log(err[0].message);
//   }
//   // If the favorite is successful, log the url of the tweet
//   else {
//     let username = response.user.screen_name;
//     let tweetId = response.id_str;
//     console.log(
//       "Favorited: ",
//       `https://twitter.com/${username}/status/${tweetId}`
//     );
//   }
// });
//     }
//   } else {
//     console.log(err);
//   }
// });

// app.set("routes", path.join(__dirname, "routes"));
app.listen(port, () => console.log(`this bad boy is running on ${port}!`));
