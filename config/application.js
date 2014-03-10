var env         = process.env.NODE_ENV || 'development'
  , packageJson = require('../package.json')
  , path        = require('path')
  , express     = require('express')

console.log('Loading App in ' + env + ' mode.')

global.App = {
  app: express()
, port: process.env.PORT || 3000
, version: packageJson.version
, root: path.join(__dirname, '..')
, appPath: function(path) {
    return this.root + '/' + path
  }
, require: function(path) {
    return require(this.appPath(path))
  }
, env: env
, start: function() {
    if (!this.started) {
      this.started = true
      this.app.listen(this.port)
      console.log("Running App Version " + App.version + " on port " + App.port + " in " + App.env + " mode")
    }
  }
, model: function(path) {
    return this.require("app/models/" + path)
  }
, route: function(path) {
    return this.require("app/routes/" + path)
  }
, util: function(path) {
    return this.require("app/utils/" + path)
  }
}

// Use Jade for views
App.app.set('views', App.appPath("app/views"))
App.app.set('view engine', 'jade');
App.app.set('view options', { pretty: env === 'development' });
App.app.locals({bossify:App.util('bossify'), pretty:true})

// Middlewarez
App.app.use(express.bodyParser())
App.app.use(express.methodOverride())
App.app.use(express.cookieParser())
App.app.use(express.cookieSession({secret: "it'sasecrettoeverybody", key: "session"}))
App.app.use(App.app.router)
App.app.use(express.static(App.appPath('public')))

App.require("config/routes")(App.app)

// Bootstrap teh db
App.require('config/database')(process.env.DATABASE_URL || 'mongodb://localhost/nodeslash_' + App.env)
