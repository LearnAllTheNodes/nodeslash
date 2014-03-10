exports.index = function index(req,res) {
  var user = {
    username: 'Apophis'
  }

  function bossify() {return 'i do not like you'}

  res.render('adventures/index', {bossify:bossify,title: 'Adventures - NodeSlash', user: user})
}

exports.create = function create(req,res) {
  function bossify(str) {
    return str + ' like a boss'
  }

  res.render('adventures/create', {bossify:bossify})
}

exports.update = function update(req,res) {
  res.render('adventures/update')
}
