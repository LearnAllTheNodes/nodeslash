var passport = require('passport')

module.exports = function(app) {
  var homeRoutes = App.route('homeRoutes')
  app.get("/",               homeRoutes.home)

  var bestiaryRoutes = App.route('bestiaryRoutes')
  app.get('/bestiary', bestiaryRoutes.index)

  var lootRoutes = App.route('lootRoutes')
  app.get('/loot',     lootRoutes.index)
  app.get("/loot/:id", lootRoutes.show)

  var usersRoutes = App.route('usersRoutes')
  app.get('/sign_up',  usersRoutes.new)
  app.post('/sign_up', usersRoutes.create)

  var sessionRoutes = App.route('sessionsRoutes')
  app.get('/sign_in',  sessionRoutes.new)
  app.post('/sign_in', passport.authenticate('local', { successRedirect: '/app', failureRedirect: '/sign_in', failureFlash: 'Invalid username or password' }))
  app.get('/sign_out', sessionRoutes.destroy)

  // REQUIRES AUTHENTICATION
  app.all('/app/*', App.middleware('ensureAuthenticated'))

  var adventuresRoutes = App.route('app/adventuresRoutes')
  app.get("/app/adventures",     adventuresRoutes.index)
  app.post("/app/adventures",    adventuresRoutes.create)
  app.put("/app/adventures/:id", adventuresRoutes.update)

  var dashboardRoutes = App.route('app/dashboardRoutes')
  app.get('/app', dashboardRoutes.index)

  var profilesRoutes = App.route('app/profilesRoutes')
  app.get('/app/profile', profilesRoutes.showSelf)
  app.get('/app/profiles/:id', profilesRoutes.show)
}
