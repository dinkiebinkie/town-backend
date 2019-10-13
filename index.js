require("dotenv").config();
const express = require("express");
const config = require("./config");
const path = require("path");

// constants
const instaClientId = process.env.INSTAGRAM_CLIENT_ID;
const instaAccessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
const binkieId = process.env.BINKIE_ID;
const port = config.port;
const app = express();

app.get("/", (req, res) => res.send(`Woo we live bud, ${port}`));
app.set("routes", path.join(__dirname, "routes"));
app.listen(port, () => console.log(`this bad boy is running on ${port}!`));
