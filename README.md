# NodeSlash - The Learn All The Nodes running project

## Current Episode

* Watch: [17-testing-route-handlers-revisited](http://www.learnallthenodes.com/episodes/17-testing-route-handlers-revisited)

When we tested route handlers last week, we tested them in isolation.  That's a useful way to test, but sometimes we also want to test exactly how a browser would.  That means we need to simulate sending HTTP requests to our application rather than just running some functions.

We do this with the Node module `supertest` which is built in part on `superagent`.  Testing in this way will run our tests through our routing and middleware stacks, giving us test coverage that our strategy from last week did not.

### Notes

[supertest](https://github.com/visionmedia/supertest)

[superagent](https://github.com/visionmedia/superagent)

[Mocha reporters](http://visionmedia.github.io/mocha/#reporters)

    // An example supertest test
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

[Episode code](https://github.com/LearnAllTheNodes/NodeSlash)

[Highway 40 Revisited](http://www.youtube.com/watch?v=RDhpC3vl8Og)

With the Makefile that we set up, use `make test` to run all of the tests.

### Previous episodes' code

From Episode 17 on, all the NodeSlash code will be in 1 repo with a different tag for each episode.  To get the code for a particular episode, use the tags navigation above.
