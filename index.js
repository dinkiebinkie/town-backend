require("dotenv").config();
const express = require("express");
const config = require("./config");
// const path = require("path");
const routes = require("./routes");

// constants
const instaClientId = process.env.INSTAGRAM_CLIENT_ID;
const instaAccessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
const binkieId = process.env.BINKIE_ID;
const port = config.port;
const app = express();

app.get("/", (req, res) =>
  res.send(
    `<h2 style="font-size:69px;font-family:sans-serif;">W E L C O M E 👏</br></h2><p style="font-size:24px;font-family:sans-serif;margin-left:16px;">this bad boy is running on: <strong>${port}</strong></p>`
  )
);
// app.set("routes", path.join(__dirname, "routes"));
app.listen(port, () => console.log(`this bad boy is running on ${port}!`));
