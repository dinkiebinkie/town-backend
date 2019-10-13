require("dotenv").config();
const express = require("express");
const config = require("./config");

// constants
const instaClientId = process.env.INSTAGRAM_CLIENT_ID;
const instaAccessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
const binkieId = process.env.BINKIE_ID;

const app = express();

app.get("/", (req, res) => res.send(`Woo we live bud, ${config.port}`));

app.listen(config.port, () =>
  console.log(`this bad boy is running on ${config.port}!`)
);
