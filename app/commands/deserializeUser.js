var User = App.model('user')

// For deserializing a user from session storage
function deserializeUser() {
  return function _deserializeUser(obj,cb) {
    User.findOne({_id: obj.id}, function(err,user) {
      cb(err,user)
    })
  }
}

module.exports = deserializeUser
