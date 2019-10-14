const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.send(`beep boop bud`));

module.exports = router;
