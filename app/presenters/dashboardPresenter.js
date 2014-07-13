function DashboardPresenter(user,cb) {
  var that = {}

  that.hasCharacters = user.characters.length > 0

  user.populate('characters', function(err) {
    that.characters = user.characters
    cb(null,that)
  })
}

module.exports = DashboardPresenter
