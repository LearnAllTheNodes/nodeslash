exports.home = function home(req,res) {
  if (req.user) {
    console.log('hello:', req.user.email)
  } else {
    console.log('no user')
  }
  res.render('home/home')
}
