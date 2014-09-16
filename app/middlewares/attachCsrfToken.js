function attachCsrfToken(req, res, next) {
  res.locals.csrfTokenFunction = req.csrfToken
}

module.exports = attachCsrfToken
