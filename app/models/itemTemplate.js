var mongoose = require('mongoose')

var schema = mongoose.Schema({
  name: String
, description: String
})

var Model = mongoose.model('ItemTemplate', schema)    

module.exports = Model

