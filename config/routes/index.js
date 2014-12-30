var letterOpener = require('letter-opener-express')

function connectAllRoutes(app,auth) {
  App.require('config/routes/root')(app,auth) 
  App.require('config/routes/auth')(app,auth) 
  App.require('config/routes/portal')(app,auth) 

  var letterOpenerConfig = {
    app: app
  , storageDir: App.appPath('tmp/email')
  } 
   
   
  letterOpener(letterOpenerConfig)
}

module.exports = connectAllRoutes
