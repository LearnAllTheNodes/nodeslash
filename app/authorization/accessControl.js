var auth = require('authorized')

auth.role('character.owner', function(record,req,cb) {
  cb(null, req.user.id === record.userId.toString())        
})

var Character = App.model('character')
auth.entity('character', function fetchCharacter(req,cb) {
  Character.findById(req.params.id, cb)
})

auth.action('modify character', ['character.owner'])

module.exports = auth

