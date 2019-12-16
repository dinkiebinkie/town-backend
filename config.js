let port = process.env.PORT || 3030;

// if testTweeting is true, don't actually do any twitter api stuff
// otherwise go ham tweeting
const testTweeting = true;

// Where should we get Tweet from?
// If true, Airtable DB
// If false, should point to local file
const databaseIsOn = false;

let svcUrl = "http://localhost:8000/";

exports.port = port;
exports.testTweeting = testTweeting;
exports.databaseIsOn = databaseIsOn;
exports.svcUrl = svcUrl;
