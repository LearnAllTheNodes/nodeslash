function DashboardPresenter(user,cb) {
  var that = {}

  that.hasCharacters = user.characters.length > 0
  that.characters = user.characters
    
  process.nextTick(function() {
    cb(null,that)
  })
}

module.exports = DashboardPresenter
