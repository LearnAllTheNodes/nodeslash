require('../../testHelper')

var User = App.model('user')
  , Character = App.model('character')
  , createCharacter = App.command('character/create')()
  , updateCharacter = App.command('character/update')()

describe(__filename, function() {
  var Test

  beforeEach(function(done) {
    Test = {}
     
    Test.user = new User({email: 'test@example.com', passwordHash: 'thisisapassword'})
    Test.user.save(function createACharacter(err) {
      assert.ifError(err)

      createCharacter(
        Test.user
      , {name:'Zeltar'}
      , function success(record) {
          Test.character = record
          done()
        }
      , function error(err,record) {
          done(err)
        }
      )
    })
  })

  it("updates the character", function(done) {
    updateCharacter(
      Test.character.id
    , {name:'Not Zeltar'}
    , function success(record) {
        Character.findById(Test.character.id,function(err,c) {
          assert.ifError(err)

          assert.equal('Not Zeltar', c.name)
          done()
        })
      }
    , function failure(err,record) {
        assert.ifError(err)
        done()
      }
    )

  })
})
