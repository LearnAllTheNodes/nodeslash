var auth = require('authorized')

auth.role('character.owner', function(record,req,cb) {
  console.log('character.owner:', record)

  cb(null, req.user.id === record.userId.toString())        
})

var Character = App.model('character')
auth.entity('character', function fetchCharacter(req,cb) {
  console.log('entity:', req.params.id)
  Character.findById(req.params.id, cb)
})

auth.action('modify character', ['character.owner'])

module.exports = auth

