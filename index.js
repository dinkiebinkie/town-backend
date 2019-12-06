// imports
const express = require("express");
require("dotenv").config();
const config = require("./config");
// const path = require("path");

// constants
// const instaClientId = process.env.INSTAGRAM_CLIENT_ID;
// const instaAccessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
// const binkieId = process.env.BINKIE_ID;

// Setting up app
const port = config.port; // usually 3030
const app = express();

// routes
const index = require("./routes/index");
const tweets = require("./routes/tweets");
const botsRoute = require("./routes/bots");

app.use("/", index);
app.use("/tweets", tweets);
app.use("/bots", botsRoute);

app.listen(port, () => console.log(`this bad boy is running on ${port}!`));
