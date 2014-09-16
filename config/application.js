var env         = process.env.NODE_ENV || 'development'
var packageJson = require('../package.json')
var path        = require('path')
var express     = require('express')
var csurf = require('csurf')

console.log('Loading App in ' + env + ' mode.')

global.App = {
  app: express()
, port: process.env.PORT || 3000
, version: packageJson.version
, name: packageJson.name
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
, command: function(path) {
    return this.require("app/commands/" + path)
  }
, middleware: function(path) {
    return this.require("app/middlewares/" + path)
  }
, model: function(path) {
    return this.require("app/models/" + path)
  }
, presenter: function(path) {
    return this.require("app/presenters/" + path)
  }
, route: function(path) {
    return this.require("app/routes/" + path)
  }
, util: function(path) {
    return this.require("app/utils/" + path)
  }
}

// Wire up authorization
App.authorization = App.require('app/authorization/accessControl')

// Use Jade for views
App.app.set('views', App.appPath("app/views"))
App.app.set('view engine', 'jade');
App.app.set('view options', { pretty: env === 'development' });
App.app.locals.bossify = App.util('bossify')
App.app.locals.pretty = true

// Configure less
var lessMiddleware = require('less-middleware')
  , lessMiddlewareOptions = {
      dest: App.appPath('/public')
    , relativeUrls: true
    , force: App.env === 'development'
    , once: App.env !== 'development'
    , debug: App.env === 'development'
    , preprocess: {
        path: function(pathname,req) {
          console.log(pathname)
          return pathname.replace('/stylesheets', '')
        }
      }
    }
  , lessParserOptions = {
      dumpLineNumbers: 'mediaquery'
    }
  , lessCompilerOptions = {
      compress: App.env !== 'development'
    }

App.app.use(lessMiddleware(
  App.appPath('app/stylesheets')
, lessMiddlewareOptions
, lessParserOptions
, lessCompilerOptions
))

// Middlewarez
var bodyParser = require('body-parser')
App.app.use(bodyParser.urlencoded({extended:true}))

var methodOverride = require('method-override')
App.app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method.toLowerCase()
    return method
  }
}))
App.app.use(require('cookie-session')({secret: "it'sasecrettoeverybody", key: 'nodeslash-session'}))
App.app.use(csurf())
App.require('config/initializers/passport.js')()
App.app.use(App.middleware('attachAuthenticationStatus'))
App.app.use(App.middleware('attachCsrfToken'))
App.app.use(require('connect-flash')())
App.app.use(App.middleware('setFlash'))
App.app.use(express.static(App.appPath('public')))

// Error middlewares
App.app.use(App.middleware('notAuthorized'))
App.app.use(App.middleware('invalidCsrfToken'))

// Bootstrap teh routes
App.require("config/routes")(App.app,App.authorization)

// Bootstrap teh db
App.require('config/database')(process.env.DATABASE_URL || 'mongodb://localhost/nodeslash_' + App.env)
