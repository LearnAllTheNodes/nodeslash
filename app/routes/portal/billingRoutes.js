function show(req,res) {
  res.render('portal/billing/show')
}

function edit(req,res) {
  res.render('portal/billing/edit')
}

function update(req,res) {
  res.render('this updates')
}

exports.show = show
exports.edit = edit
exports.update = update
