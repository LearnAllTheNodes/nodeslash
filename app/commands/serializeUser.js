function serializeUser() {
  return function _serializeUser(user,cb) {
    cb(null, {'type': 'user', 'id': user.id})
  }
}

module.exports = serializeUser
