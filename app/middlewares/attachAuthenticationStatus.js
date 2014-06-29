function attachAuthenticationStatus(req,res,next) {
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
}

module.exports = attachAuthenticationStatus
