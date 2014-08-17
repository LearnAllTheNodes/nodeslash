var express = require('express')

// handlers
var bestiaryRoutes = App.route('bestiaryRoutes')
var homeRoutes = App.route('homeRoutes')
var lootRoutes = App.route('lootRoutes')

function rootRoutes(app,auth) {
  var rootRouter = express.Router()

  // Root
  rootRouter.route('/').get(homeRoutes.home)
  rootRouter.route('/about').get(homeRoutes.about)
  rootRouter.route('/bestiary').get(bestiaryRoutes.index)

  rootRouter.route('/loot').get(lootRoutes.index)
  rootRouter.route('/loot/:id').get(lootRoutes.show)

  app.use('/', rootRouter)
}

module.exports = rootRoutes
