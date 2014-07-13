var Character = App.model('character')

var loadContext = App.presenter('dashboardPresenter')
function index(req,res) {
  loadContext(req.user, function(err,dashboard) {
    res.render('app/characters/index', {context: dashboard})
  })
}

function newCharacter(req,res) {
  res.render('app/characters/new', {character: new Character()})
}

var createCharacter = App.command('character/create')()
function create(req,res,next) {
  createCharacter(
    req.user
  , req.body.character
  , function onSuccess(record) {
      req.flash('notice', 'Ye character ist ready for battle!')
      res.redirect('app/characters/' + record.id)
    }
  , function onFailure(err,record) {
      res.render('app/characters/new', {character:record, flash:{error: 'Oopseth!  Your character is not ready ventureth forth.'}})
    }
  )
}

function show(req,res,next) {
  Character.findById(req.params.id, function(err,record) {
    if (err) return next(err)
    if (!record) return next(new Error('character not found'))

    res.render('app/characters/show', {character:record})
  })
}

function edit(req,res) {
  Character.findById(req.params.id,function(err,record) {
    if (err) return next(new Error('not found'))

    res.render('app/characters/edit', {character: record})
  })
}

function update(req,res) {

}

function destroy(req,res) {

}

exports.index = index
exports.new = newCharacter
exports.create = create
exports.show = show
exports.edit = edit
exports.update = update
exports.destroy = destroy
