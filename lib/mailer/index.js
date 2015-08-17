module.exports = wrap

var nodemailer = require('nodemailer')
var pickupTransport = require('nodemailer-pickup-transport')

function wrap(config) {
  var options = {
    directory: App.appPath('tmp/email')
  }

  var transport = pickupTransport(options)

  return nodemailer.createTransport(transport)
}
