#binkie server

## overview

This server manages the connection between the front end, the machine learning algorithms, the DataBase, and the twitter bots. It uses Yarn, runs on heroku yolo

### deployment

Make sure git is up to date, then git push heroku master

### order of events for Tweeting

Please see assets/serverDiagrams

1. Timer goes off (for specific bot)
2. Fetch the tweet array of objects from the DB
3. Check if ther amount of tweets is satisfactory
   YES
4. Skip to step 7
   NO
5. ML generates array of tweet strings
6. Ensure Tweets aren't naughty and ready for storage
7. tweet
8. Send Tweet to the dump - sit in 72 hr / 50 tweet max backlog for live stream on binkie.town. ping socket.io
9. Restart Timer

### Database

Index.js is entrance point obvs.
TweetJobs - when tweets are generated, store the jobs here.
Bots - store all of the bots we have here
Tweets - All of the tweets that have been generated, to be tweeted soon
TweetDumpster - backlog of recently generated tweets, for live feed on binkie.town
