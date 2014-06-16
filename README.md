# NodeSlash - The Learn All The Nodes running project

## Current Episode

* [Watch:](http://www.learnallthenodes.com/episodes/21-password-authentication-in-node-with-passport) Password Authentication in Node with Passport

Last time we did the overview of Passport.  We installed it into NodeSlash and talked about how the various pieces fit together.  

That may not yet have helped you with your project.  You didn't really learn how to set up and *use* Passport.  You didn't end last week with code allowing you to log your users in.

This week is different.  Today we actually write the code that will let us log our users in and out.

### Notes

[Passport](http://passportjs.org/)

[The command pattern](http://en.wikipedia.org/wiki/Command_pattern)

[Episode code](https://github.com/LearnAllTheNodes/nodeslash/tree/00021)

    // Initializing passport
    function init() {
      var passport = require('passport')
         , LocalStrategy = require('passport-local').Strategy
         , usernameAndPasswordStrategy = new LocalStrategy(
            {usernameField: 'email', passwordField: 'password'}
          , App.model('user').findByEmailAndPassword
          )
        , serializeUser = App.command('serializeUser')()
        , deserializeUser = App.command('deserializeUser')()
  
        passport.use(usernameAndPasswordStrategy)
        passport.serializeUser(serializeUser)
        passport.deserializeUser(deserializeUser)
  
        App.app.use(passport.initialize())
        App.app.use(passport.session())
    }

    module.exports = init

    // calling our passport initialization
    App.require('config/initializers/passport.js')()

    // serializing the user
    function serializeUser() {
      return function _serializeUser(user,cb) {
        cb(null, {'type': 'user', 'id': user.id})
      }
    }

    module.exports = serializeUser

    //deserializing the user
    var User = App.model('user')

    // For deserializing a user from session storage
    function deserializeUser() {
      return function _deserializeUser(obj,cb) {
        User.findOne({_id: obj.id}, function(err,user) {
          cb(err,user)
        })
      }
    }
    
    module.exports = deserializeUser

    // Using passport in our routes
    app.post('/sign_in', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/sign_in', failureFlash: 'Invalid username or password' }))

### Previous episodes' code

From Episode 17 on, all the NodeSlash code will be in 1 repo with a different tag for each episode.  To get the code for a particular episode, use the tags navigation above.
