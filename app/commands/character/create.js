var Character = App.model('character')
  , User = App.model('user')

function createCharacter() {
  return function _createCharacter(user,params,success,failure,error) {
    var record = new Character(params)
    record.userId = user.id
    console.log(params)


    record.save(function(err) {
      if (err) return failure(err,record)
      
      user.characters = user.characters || []
      user.characters.push(record.id)
      user.save(function(err) {
        if (err) return failure(err,record)

        success(record)
      })
    })
  }
}

module.exports = createCharacter
