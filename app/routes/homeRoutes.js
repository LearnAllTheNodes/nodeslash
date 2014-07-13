function home(req,res) {
  res.render('home/home')
}

function about(req,res) {
  res.render('home/about')
}

exports.home = home
exports.about = about
