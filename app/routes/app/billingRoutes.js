function show(req,res) {
  res.render('app/billing/show')
}

function edit(req,res) {
  res.render('app/billing/edit')
}

function update(req,res) {
  res.render('this updates')
}

exports.show = show
exports.edit = edit
exports.update = update
