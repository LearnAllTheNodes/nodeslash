function characterNotFoundError(err, req, res, next) {
  if (err.code !== 'E_CHARACTERNOTFOUND') return next(err)
                    
  res.status(404).send('Character not found')
}

module.exports = characterNotFoundError

