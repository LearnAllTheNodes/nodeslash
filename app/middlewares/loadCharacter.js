function loadCharacter(req, res, next) {
  mysteriousDb.findCharacter(req.params.id, function (err, character) {
    if (err) return next(err)
    if (!character) {
      var error = new Error('Character not found')
      error.code = 'E_CHARACTERNOTFOUND'
          
      return next(error)
    }
        
    req.view = { character: character }
    next()
  })
}

module.exports = loadCharacter

