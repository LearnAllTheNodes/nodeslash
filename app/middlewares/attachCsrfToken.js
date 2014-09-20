function attachCsrfToken(req, res, next) {
  res.locals.csrfTokenFunction = req.csrfToken
  next()
}

module.exports = attachCsrfToken
