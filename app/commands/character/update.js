var Character = App.model('character')

function updateCharacter() {
  return function _createCharacter(characterId,params,success,failure,error) {
    Character.findById(characterId, function(err,c) {
      if (err) return error(err)
      if (!c) return failure(new Error('not found'))

      c.name = params.name
      c.save(function(err) {
        if (err) return failure(err)

        return success(c)
      })
    })
  }
}

module.exports = updateCharacter
