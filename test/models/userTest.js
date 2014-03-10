require('../testHelper')

var User = App.model('user')

describe(__filename, function() {
  it('hashes the user\'s password', function(done) {
    var u = new User({email: 'email@example.com', passwordHash: 'override'})
    u.save(function(err) {
      assert.ifError(err)

      assert(u.passwordHash)
      assert.notEqual(u.passwordHash, 'override')
      done()
    })
  })
})
