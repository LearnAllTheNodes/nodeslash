require('../testHelper')

var User = App.model('user')
  , supertest = require('supertest')

describe(__filename, function() {
  var Test 

  beforeEach(function() {
    Test = {}
  })

  describe('Having a user in the database', function() {
    beforeEach(function(done) {
      Test.userData = {
        email: 'existy@example.com'
      , password: 'override'
      }

      Test.user = new User({email:Test.userData.email, passwordHash:Test.userData.password})
      Test.user.save(function(err) {
        assert.ifError(err)

        done()
      })
    })


    it("should create a new user when we pass valid data", function(done) {
      supertest(App.app)
        .post('/sign_up')
        .send({email:'noexisty@example.com', password:'override'})
        .expect(200)
        .end(function(err,res) {
          if (err) {
            console.log('error:',err)
            console.log(res.body)
            assert.ifError(err)
          } else {
            User.find({email:'noexisty@example.com'}, function(err,users) {
              assert.ifError(err)

              assert(users[0])
              assert.equal(users[0].email, 'noexisty@example.com')
              done()
            })
          }
        })
    })

    it("should not create a new user when we pass duplicate data", function(done) {
      supertest(App.app)
        .post('/sign_up')
        .send({email:Test.userData.email, password:'override'})
        .expect(422)
        .end(function(err,res) {
          if (err) {
            console.log('error:',err)
            console.log(res.body)
            assert.ifError(err)
          } else {
            done()
          }
        })
    })
  })

  it("should create the new users", function(done) {
    var req = {
      body: {
        email: 'test@example.com'
      , password: 'override'
      }
    }

    var res = {
      status: function(val) {
        this._status = val
        return this
      }
    , send: function(val) {
        assert.equal(this._status, 200)
        assert.equal(val, 'Welcome to the game.')

        User.count({}, function(err,count) {
          assert.ifError(err)
          assert.equal(1,count)

          User.find({}, function(err,records) {
            assert.ifError(err)
            assert.equal(records[0].email, 'test@example.com')
            done()
          })
        })
      }
    }

    var usersRoutes = App.route('usersRoutes')

    usersRoutes.create(req,res)
  })
})
