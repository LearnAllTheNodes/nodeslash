var mongoose = require('mongoose')
  , validate = require('mongoose-validate')
  , bcrypt   = require('bcrypt')
  , SALT_WORK_FACTOR = 10
  , REQUIRED_PASSWORD_LENGTH = 8

var config = {
  urls: App.urls
, mail: {
    sender: App.mailSender
  }
, mailer: App.mailer
}

var sendUserRegistrationEmail = require('../userRegistrations/actions/sendUserRegistrationEmail')(config)

function validateStringLength(value) {
  return value && value.length >= REQUIRED_PASSWORD_LENGTH
}

var schema = mongoose.Schema({
  email: {type: String, unique: true}
, passwordHash: {type: String}
, characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character'}]
})

schema.pre('save', function(next) {
  var self = this

  if (!self.isModified('passwordHash')) return next()

  self.wasNew = self.isNew

  bcrypt.hash(self.passwordHash, SALT_WORK_FACTOR, function(err,hash) {
    if (err) return next(err)

    self.passwordHash = hash
    next()
  })
})

schema.post('save', function (user) {
  if (user.wasNew) {
    sendUserRegistrationEmail(user)
  }
})

schema.statics.findByEmailAndPassword = function findByEmailAndPassword(email,password,cb) {
  Model.findOne({email:email}, function(err,user) {
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

