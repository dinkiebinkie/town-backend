let port = process.env.PORT || 3030;

// Where should we get Tweet from?
// If true, Airtable DB
// If false, should point to local file
const databaseIsOn = true;

let svcUrl = "http://localhost:8000/";

exports.port = port;
exports.databaseIsOn = databaseIsOn;
exports.svcUrl = svcUrl;
