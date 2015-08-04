var validator = require('validator')

function validateNewUser(req, res, next) {
  req.view = { errors: {} }  

  if (!validator.isEmail(req.body.email)) {
    req.view.errors['email'] = [ 'must be a valid email address.' ]
  }

  if (!validator.isLength(req.body.password)) {
    req.view.errors['password'] = [ 'must be at least 8 characters long' ]
  }

  if (req.view.errors.email || req.view.errors.password) {
    var error = new Error('Invalid params')
    error.code = 'E_INVALIDUSER'

    return next(err)
  }

  next()
}

module.exports = validateNewUser
