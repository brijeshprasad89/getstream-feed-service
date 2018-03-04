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

   let actor = client.feed('timeline', req.body.actor);
   const activity = {'actor': req.body.actor, 'verb': req.body.verb, 'object':req.body.object,'message':req.body.message};
   actor.addActivity(activity).then(result =>{
     console.log(result);
     return res.status(200).json("Feed posted by " +result.actor+" having message:::: " +result.message);
   }).catch(err =>{
     return res.status(500).json("There was a problem in posting the feed");
   })


 };
