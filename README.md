# NodeSlash - The Learn All The Nodes running project

## Current Episode

* [Watch:](http://www.learnallthenodes.com/episodes/23-authorization-with-passport-part-1-ensuring-theyre-logged-in)

When you're writing a web app, often times your users are going to do things in the app for which you would like to display little notifications.  These need to be independent of which page they're on, and they don't show up with every page load.

These messages are sometimes referred to as flash messages, are no way related to the successful Adobe product, and are the topic of this week's episode.

### Notes

[Opening clipart](http://openclipart.org/detail/8935/police-man-by-gerald_g-8935)

[Episode code](https://github.com/LearnAllTheNodes/nodeslash/tree/00023)

    // app/middlewares/ensureAuthenticated.js
    function ensureAuthenticated(req,res,next) {
      if (req.isAuthenticated()) {
        next()
      } else {
        req.flash('error', 'You must be logged in to do that.')
        res.redirect('/sign_in')
      }
    }

    module.exports = ensureAuthenticated

    // In config/routes.js, now at the end
    // REQUIRES AUTHENTICATION
    app.all('/app/*', App.middleware('ensureAuthenticated'))

    var adventuresRoutes = App.route('adventuresRoutes')
    app.get("/app/adventures",     adventuresRoutes.index)
    app.post("/app/adventures",    adventuresRoutes.create)
    app.put("/app/adventures/:id", adventuresRoutes.update)

    // app/middlewares/attachAuthenticationStatus.js
    // This middleware makes the login status of the users available
    // to our views.
    function attachAuthenticationStatus(req,res,next) {
      res.locals.isAuthenticated = req.isAuthenticated()
      next()
    }
    
    module.exports = attachAuthenticationStatus

    // In config/application.js    
    // Middlewarez
    App.app.use(express.bodyParser())
    App.app.use(express.methodOverride())
    App.app.use(express.cookieParser())
    App.app.use(express.cookieSession({secret: "it'sasecrettoeverybody", key: "session"}))
    App.require('config/initializers/passport.js')()
    App.app.use(App.middleware('attachAuthenticationStatus'))  // LOOK AT ME!
    App.app.use(require('connect-flash')())
    App.app.use(App.middleware('setFlash'))
    App.app.use(App.app.router)
    App.app.use(express.static(App.appPath('public')))


    // In app/views/layouts/navBar.jade
      - if (!isAuthenticated)
        li
          a(href="/sign_in") Sign in
        li
          a(href="/sign_up") Sign up
      - else
        li
          a(href="/sign_out") Sign out

### Previous episodes' code

From Episode 17 on, all the NodeSlash code will be in 1 repo with a different tag for each episode.  To get the code for a particular episode, use the tags navigation above.
