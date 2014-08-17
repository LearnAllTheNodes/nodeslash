function connectAllRoutes(app,auth) {
  App.require('config/routes/root')(app,auth) 
  App.require('config/routes/auth')(app,auth) 
  App.require('config/routes/portal')(app,auth) 
}

module.exports = connectAllRoutes
