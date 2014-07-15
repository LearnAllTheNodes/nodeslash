# NodeSlash - The Learn All The Nodes running project

## Current Episode

* [Watch:](http://www.learnallthenodes.com/episodes/25-authorization-part-2-ensuring-they-have-permission)

In our previous episodes with Passport we've set up a way to verify that a user is who the user claims to be.  We can log users in, keep them away from pages that require them to be logged in, and we even convinced ourselves of that via Firebug and the Node console.

Firebug and the Node console won't pacify our users much if nefarious actors are able to own their data in our apps.  In this episode we're going to ensure that our users have the permissions they're claiming, and we do that with a package called "authorized".

### Notes

[Opening graphic](http://openclipart.org/detail/183954/dont-touch-by-frankes-183954)

[`authorized`](https://github.com/tschaub/authorized)

[Episode code](https://github.com/LearnAllTheNodes/nodeslash/tree/00025)

    // app/authorization/accessControl.js
    var auth = require('authorized')
    
    auth.role('character.owner', function(record,req,cb) {
      cb(null, req.user.id === record.userId.toString())        
    })
    
    var Character = App.model('character')
    auth.entity('character', function fetchCharacter(req,cb) {
      Character.findById(req.params.id, cb)
    })
    
    auth.action('modify character', ['character.owner'])
    
    module.exports = auth

### Previous episodes' code

From Episode 17 on, all the NodeSlash code will be in 1 repo with a different tag for each episode.  To get the code for a particular episode, use the tags navigation above.
