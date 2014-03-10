var mongoose = require('mongoose')
  , validate = require('mongoose-validate')
  , bcrypt   = require('bcrypt')
  , SALT_WORK_FACTOR = 10
  , REQUIRED_PASSWORD_LENGTH = 8

function validateStringLength(value) {
  return value && value.length >= REQUIRED_PASSWORD_LENGTH
}

var schema = mongoose.Schema({
  email: {type: String, required: true, unique: true, validate: [validate.email, 'is not a valid email address']}
, passwordHash: {type: String, required: true, validate: [validateStringLength, 'is too short (minimum is ' + REQUIRED_PASSWORD_LENGTH + ' characters']}
})

schema.pre('save', function(next) {
  var self = this

  if (!self.isModified('passwordHash')) return next()

  bcrypt.hash(self.passwordHash, SALT_WORK_FACTOR, function(err,hash) {
    if (err) return next(err)

    self.passwordHash = hash
    next()
  })
})

schema.statics.findByEmailAndPassword = function findByEmailAndPassword(email,password,cb) {
  this.findOne({email:email}, function(err,user) {
    if (err)   return cb(err)
    if (!user) return cb()

    bcrypt.compare(password, user.passwordHash, function(err,res) {
      return cb(err, res ? user : null)
    })
  })
}

schema.set('autoIndex', App.env !== 'production')

var Model = mongoose.model('User', schema)    

module.exports = Model

