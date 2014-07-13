var mongoose = require('mongoose')
  , REQUIRED_CHARACTER_NAME_LENGTH = 8

function validateStringLength(value) {
  return value && value.length >= REQUIRED_CHARACTER_NAME_LENGTH
}

var schema = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
, name: {type: String, required: true, unique: true, validate: [validateStringLength, 'is too short (minimum if ' + REQUIRED_CHARACTER_NAME_LENGTH + ' characters']}
})

schema.set('autoIndex', App.env !== 'production')

var Model = mongoose.model('Character', schema)    

module.exports = Model

