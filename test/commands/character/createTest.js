require('../../testHelper')

var User = App.model('user')
  , Character = App.model('character')
  , createCharacter = App.command('character/create')()

describe(__filename, function() {
  var Test

  beforeEach(function(done) {
    Test = {}
     
    Test.user = new User({email: 'test@example.com', passwordHash: 'thisisapassword'})
    Test.user.save(done)
  })

  it('creates a character', function(done) {
    createCharacter(
      Test.user
    , {name:'Zeltar'}
    , function success(record) {
        done()
      }
    , function error(err,record) {
        assert.ifError(err)
        done()
      }
    )
  })

  it("adds the new character to the parent user's array", function(done) {
    createCharacter(
      Test.user
    , {name:'Zeltar'}
    , function success(record) {
        User.findById(Test.user.id,function(err,user) {
          assert.ifError(err)

          assert.equal(1, user.characters.length)
          assert.equal(record.id, user.characters[0])
          done()
        })
      }
    , function error(err,record) {
        assert.ifError(err)
        done()
      }
    )

  })
})
