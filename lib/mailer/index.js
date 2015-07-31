module.exports = wrap

var nodemailer = require('nodemailer')
var pickupTransport = require('nodemailer-pickup-transport')
var sendGridTransport = require('nodemailer-sendgrid-transport')

var transportMap = {
  'local': pickupTransport
, 'live': sendGridTransport
}

function wrap(config) {
  var transport = transportMap[config.transport](config.options)

  return nodemailer.createTransport(transport)
}
