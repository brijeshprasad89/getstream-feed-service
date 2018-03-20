const stream = require('getstream');
/**
 * Controller for retrieving the journalConfigs from DB.
 *
 * @param req Provided HTTP request
 * @param res Returned HTTP response
 */

 exports.postFeed = (req, res) => {
   console.log(req.body.actor);
   // Instantiate a new client (server side)
   client = stream.connect('mhvadvrbedsu', 'r3kvq53jtsfcr6jvp3eszpvpcwpw5w5fy9jrrrxsvyfh2uamkuw7vth8fh2gfsw5', '35055');

   let actor = client.feed(req.body.feedGroup, req.body.actor);
   const activity = {'actor': req.body.actor, 'verb': req.body.verb, 'object':req.body.object,'message':req.body.message};
   actor.addActivity(activity).then(result =>{
     console.log(result);
     return res.status(200).json("Feed posted by " +result.actor+" having message:::: " +result.message);
   }).catch(err =>{
     return res.status(500).json("There was a problem in posting the feed");
   })


 };


 exports.getFeed = (req, res) => {
   console.log(req.params.admin);
   // Instantiate a new client (server side)
   client = stream.connect('mhvadvrbedsu', 'r3kvq53jtsfcr6jvp3eszpvpcwpw5w5fy9jrrrxsvyfh2uamkuw7vth8fh2gfsw5', '35055');

   var timeline_1 = client.feed('timeline', req.params.admin);

  /*Get Followed feeds::: */
   timeline_1.following().then(result =>{
     let results = result['results'];
     let promises = [];
     results.forEach(result =>{
        let admin = client.feed(result['target_id'].split(':')[0], result['target_id'].split(':')[1]);
        promises.push(admin.get({}));
     });
     Promise.all(promises).then(function(values) {
          let finalResult = []
          values.forEach(value =>{
            value['results'].forEach(feed =>{
              console.log(feed);
              let tempFeedObject = {"admin":"","message":"","created_at":""};
              tempFeedObject['admin'] = feed['actor'];
              tempFeedObject['message'] = feed['message'];
              let timePosted = new Date(feed['time']);
              let timeNow =  new Date();
              tempFeedObject['created_at'] = timeNow.getHours() - timePosted.getHours();
              finalResult.push(tempFeedObject);
            })
          })
          return res.status(200).json(finalResult);
    });

   }).catch(err =>{
     return res.json(err);
   });

 };

 exports.getTokenForClient = (req,res) => {
   client = stream.connect('mhvadvrbedsu', 'r3kvq53jtsfcr6jvp3eszpvpcwpw5w5fy9jrrrxsvyfh2uamkuw7vth8fh2gfsw5', '35055');

   var token = client.feed('user', '1').token;
   return res.status(200).json(token);

 }
