var express = require('express')

// handlers
var adventuresRoutes = App.route('portal/adventuresRoutes')
var billingRoutes = App.route('portal/billingRoutes')
var characterRoutes = App.route('portal/charactersRoutes')
var dashboardRoutes = App.route('portal/dashboardRoutes')
var profilesRoutes = App.route('portal/profilesRoutes')

// middleware
var ensureAuthenticated = App.middleware('ensureAuthenticated')

function portalRoutes(app,auth) {
  var canModifyCharacter = auth.can('modify character')
    
  var portalRouter = express.Router()

  // portal
  portalRouter.use('/', ensureAuthenticated)

  portalRouter.route('/adventures')
    .get(adventuresRoutes.index)
    .post(adventuresRoutes.create)

  portalRouter.route('/adventures/:id').put(adventuresRoutes.update)

  portalRouter.route('/').get(dashboardRoutes.index)

  portalRouter.route('/profile').get(profilesRoutes.showSelf)
  portalRouter.route('/profile/edit').get(profilesRoutes.edit)
  portalRouter.route('/profiles/:id').get(profilesRoutes.show)

  portalRouter.route('/billing/dangerous_action')
    .post(billingRoutes.unsecure)

  portalRouter.route('/billing').get(billingRoutes.show)
  portalRouter.route('/billing/edit').get(billingRoutes.edit)
  portalRouter.put('/billing/update').get(billingRoutes.update)

  portalRouter.route('/characters/')
    .get(characterRoutes.index)
    .post(characterRoutes.create)

  portalRouter.route('/characters/new').get(characterRoutes.new)

  portalRouter.route('/characters/:id')
    .get(characterRoutes.show)
    .put(canModifyCharacter, characterRoutes.update)

  portalRouter.route('/characters/:id/edit').get(canModifyCharacter, characterRoutes.edit)
  
  app.use('/portal', portalRouter)
}

module.exports = portalRoutes
