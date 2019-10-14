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
8. API call to twitter to get 72 hrs of tweets/max 25, for binkie.town live feed -> ping socket.io
9. Delete this tweeted tweet from DB
10. Restart Timer
