function show(req, res) {
  res.render('portal/billing/show')
}

function edit(req, res) {
  res.render('portal/billing/edit')
}

function update(req, res) {
  res.render('this updates')
}

// This route exists only to show off CSRF attacks.  Make sure to delete it starting with episode 34.
function unsecure(req, res) {
  var params = req.query.receiver ? req.query : req.body
  var sadMsg = require('util').format('I just sent $%s to %s.  Why do I have a sinking feeling about that?', params.amount, params.receiver)

  console.log(sadMsg)
  res.send(sadMsg)
}

exports.show = show
exports.edit = edit
exports.update = update
exports.unsecure = unsecure
