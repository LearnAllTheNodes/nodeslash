function invalidNewUserError(err, req, res, next) {
  if (err.code !== 'E_INVALIDUSER') return next(err)

  var errorString = ''

  if (req.view.errors.email) errorString += 'Email: ' + req.view.errors.email.join(', ')
  if (req.view.errors.password) errorString += 'Password: ' + req.view.errors.password.join(', ')

  res.status(422).send('Problem: ' + errorString)
}

module.exports = invalidNewUserError
