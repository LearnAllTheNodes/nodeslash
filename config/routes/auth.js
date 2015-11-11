var passport = require('passport')
var express = require('express')

// handlers
var sessionRoutes = App.route('auth/sessionsRoutes')
var usersRoutes = App.route('auth/usersRoutes')

// middleware
var invalidNewUserError = App.middleware('invalidNewUserError')
var validateNewUser = App.middleware('validateNewUser')

function authRoutes(app,auth) {
  var authRouter = express.Router()

  // Authentication
  authRouter.route('/sign_up')
    .get(usersRoutes.new)
    .post(
      validateNewUser
    , usersRoutes.create
    , invalidNewUserError
    )

  authRouter.route('/sign_in')
    .get(sessionRoutes.new)
    .post(passport.authenticate('local', { successRedirect: '/portal', failureRedirect: '/auth/sign_in', failureFlash: 'Invalid username or password' }))

  authRouter.get('/sign_out', sessionRoutes.destroy)

  app.use('/auth', authRouter)
}

module.exports = authRoutes
