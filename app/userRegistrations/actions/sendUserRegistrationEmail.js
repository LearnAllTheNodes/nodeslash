module.exports = wrap

var emailTemplates = require('email-templates')

function wrap(config) {

  function sendUserRegistrationEmail(user) {
    emailTemplates(App.appPath('app/userRegistrations/templates'), function loadedTemplates(err, templates) {
      if (err) return doSomethingWithError(err)

      var context = {
        user: user
      , root: config.urls.root
      }

      templates('userRegistrationEmail', context, function renderedTemplate(err, html, text) {
        if (err) return doSomethingWithError(err)
        
        var mailerArgs = {
          from: config.mail.sender
        , to: context.user.email
        , subject: "Welcometh to NodeSlash"
        , html: html
        , text: text
        }

        config.mailer.sendMail(mailerArgs, doSomethingWithError)
      })
    })
  }

  // This function demonstrates the weakness of using Mongoose middleware to handle this
  // We don't have anything to do with the function here
  function doSomethingWithError(err) {
    console.log(err)
  }
  
  return sendUserRegistrationEmail
}
