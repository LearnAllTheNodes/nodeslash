function newSession(req,res) {
  res.render('auth/sessions/new', {title: 'Welcome back - NodeSlash'})
}

var User = App.model('user')
function create(req,res) {
  User.findByEmailAndPassword(req.body.email, req.body.password, function(err,user) {
    if (err) {
      res.status(422).send('Problem:', err.message)
    } else if (!user) {
      res.status(401).send('That email & password did not match our records')
    } else {
      res.status(200).send('Welcome back, ' + user.email)
    }
  })
}

function destroy(req,res) {
  req.logout()
  req.flash('notice', 'You have successfully signed out.')
  res.redirect('/')
}

exports.new    = newSession
exports.create = create
exports.destroy = destroy
