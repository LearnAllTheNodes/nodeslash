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
