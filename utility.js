// helper functions ...?

const bots = require("./bots");

// set timeout for next action/tweet
function setTimer(id) {
  const thisBot = bots.find(bot => bot.id === id);
  const botTimer = thisBot.timer;

  // convert timer to MS
  // random number between 70% - 130% of config timer set from bots.js
  const timer = (Math.random() * (1.3 - 0.7) + 0.7) * 60 * 60 * 1000 * botTimer;
}
