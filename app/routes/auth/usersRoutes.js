var User = App.model('user')
function newUser(req,res) {
  res.render('auth/users/new', {title: 'Join the adventure - NodeSlash'})
}

function create(req,res,next) {
  var u = new User({email: req.body.email, passwordHash: req.body.password})  
  u.save(function(err) {
    if (err) {
      res.status(422).send('Problem: ' + err.message)
    } else {
      req.login(u, function(err) {
        if (err) { return next(err) }

        req.flash('notice', 'Welcome to the game.')
        return res.redirect('/portal')
      })
    }
  })
}

exports.new    = newUser
exports.create = create
