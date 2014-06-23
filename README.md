# NodeSlash - The Learn All The Nodes running project

## Current Episode

* [Watch:](http://www.learnallthenodes.com/episodes/21-password-authentication-in-node-with-passport) Password Authentication in Node with Passport

When you're writing a web app, often times your users are going to do things in the app for which you would like to display little notifications.  These need to be independent of which page they're on, and they don't show up with every page load.

These messages are sometimes referred to as flash messages, are no way related to the successful Adobe product, and are the topic of this week's episode.

### Notes

[connect-flash](https://github.com/jaredhanson/connect-flash)

[Episode code](https://github.com/LearnAllTheNodes/nodeslash/tree/00022)

    // config/application.js
    // connecting the middlware (AFTER the session middlewares
    App.app.use(require('connect-flash')())  // gives access to the flash
    App.app.use(App.middleware('setFlash'))  // makes it available to our views

    // app/middlewares/setFlash.js
    function setFlash(req,res,next) {
      res.locals.flash = {
        notice: req.flash('notice')
      , error: req.flash('error')
      }
    
      next()
    }

    module.exports = setFlash

    // app/views/layouts/flash.jade
    - if (flash && flash.notice && flash.notice.length > 0)
      p.alert.alert-success= flash.notice
    - if (flash && flash.error && flash.error.length > 0)
      p.alert.alert-danger= flash.error

    // app/views/layouts/home.jade
    .container
      include flash // making sure the flashes show up on our pages
      block content


### Previous episodes' code

From Episode 17 on, all the NodeSlash code will be in 1 repo with a different tag for each episode.  To get the code for a particular episode, use the tags navigation above.
