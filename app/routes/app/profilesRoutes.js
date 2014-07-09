// No matter what, this route only shows the current user
function showSelf(req,res) {
  res.render('app/profiles/show')
}

// Most profiles will have some degree of being public
function show(req,res) {
  res.render('app/profiles/show')
}

exports.showSelf = showSelf
exports.show = show
