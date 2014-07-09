function attachAuthenticationStatus(req,res,next) {
  res.locals.isAuthenticated = req.isAuthenticated()

  if (req.isAuthenticated()) {
    res.locals.currentUser = req.user
  }
  next()
}

module.exports = attachAuthenticationStatus
