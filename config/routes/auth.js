var passport = require('passport')
var express = require('express')

// handlers
var sessionRoutes = App.route('auth/sessionsRoutes')
var usersRoutes = App.route('auth/usersRoutes')

function authRoutes(app,auth) {
  var authRouter = express.Router()

  // Authentication
  authRouter.route('/sign_up')
    .get(usersRoutes.new)
    .post(usersRoutes.create)

  authRouter.route('/sign_in')
    .get(sessionRoutes.new)
    .post(passport.authenticate('local', { successRedirect: '/portal', failureRedirect: '/auth/sign_in', failureFlash: 'Invalid username or password' }))

  authRouter.get('/sign_out', sessionRoutes.destroy)

  app.use('/auth', authRouter)
}

module.exports = authRoutes
