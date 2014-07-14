var auth = require('authorized')

module.exports = function notAuthorized(err,req,res,next) {
  if (err instanceof auth.UnauthorizedError) {
    res.send(401, 'Unauthorized')
  } else {
    next(err)
  }
}
