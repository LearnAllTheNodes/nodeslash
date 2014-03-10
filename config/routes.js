module.exports = function(app) {
  var homeRoutes = App.route('homeRoutes')
  app.get("/",               homeRoutes.home)

  var adventuresRoutes = App.route('adventuresRoutes')
  app.get("/adventures",     adventuresRoutes.index)
  app.post("/adventures",    adventuresRoutes.create)
  app.put("/adventures/:id", adventuresRoutes.update)

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
  app.post('/sign_in', sessionRoutes.create)
}
