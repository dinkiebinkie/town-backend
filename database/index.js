const models = require("./models");
const config = require("./../config");
const sequelize = require("sequelize");

const noOpPromise = function() {
  return new Promoise(function(resolve, reject) {
    process.nextTick(() => {
      console.log("We is in a NOOP Brudda");
      resolve(null);
    });
  });
};

const createJob = function(param) {
  if (!config.databaseIsOn) {
    return noOpPromise();
  }
};
