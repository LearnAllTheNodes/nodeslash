process.env.NODE_ENV = 'test'
require('../config/application')

var async = require('async')
  , mongoose = require('mongoose')

global.assert = require('assert')

App.Test = {
  // done - function(err)
  clearDb: function(done) {
    // Add more models here as you need to clean them out
    var models = [
      "User"
    ]

    async.each(
      models,
      function(modelName,cb) {
        var model = mongoose.model(modelName)

        model.remove({}, cb)
      },
      function(err) {
        assert.ifError(err)
        done()
      }
    )
  }  
}

beforeEach(function(done) {
  App.Test.clearDb(done)
})
