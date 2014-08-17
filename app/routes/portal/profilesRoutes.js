// No matter what, this route only shows the current user
function showSelf(req,res) {
  res.render('portal/profiles/show')
}

// Most profiles will have some degree of being public
function show(req,res) {
  res.render('portal/profiles/show')
}

function edit(req,res) {
  res.render('portal/profiles/edit')
}

exports.showSelf = showSelf
exports.show = show
exports.edit = edit
