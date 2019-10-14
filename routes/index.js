const express = require("express");
const router = express.Router();
const port = require("../config").port;

router.get("/", (req, res) =>
  res.send(
    `<h2 style="font-size:69px;font-family:sans-serif;">W E L C O M E 👏</br></h2><p style="font-size:24px;font-family:sans-serif;margin-left:16px;">this bad boy is running on: <strong>${port}</strong></p>`
  )
);

module.exports = router;
