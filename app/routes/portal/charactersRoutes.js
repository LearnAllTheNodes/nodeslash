var Character = App.model('character')

var loadContext = App.presenter('dashboardPresenter')
function index(req,res) {
  loadContext(req.user, function(err,dashboard) {
    res.render('portal/characters/index', {context: dashboard})
  })
}

function newCharacter(req,res) {
  res.render('portal/characters/new', {character: new Character()})
}

var createCharacter = App.command('character/create')()
function create(req,res,next) {
  console.log(req.body)
  createCharacter(
    req.user
  , req.body.character
  , function onSuccess(record) {
      req.flash('notice', 'Ye character ist ready for battle!')
      res.redirect('/portal/characters/' + record.id)
    }
  , function onFailure(err,record) {
      res.render('portal/characters/new', {character:record, flash:{error: 'Oopseth!  Your character is not ready ventureth forth.'}})
    }
  )
}

function show(req,res,next) {
  res.render('portal/characters/show', req.view)
}

function edit(req,res) {
  Character.findById(req.params.id,function(err,record) {
    if (err) return next(new Error('not found'))

    res.render('portal/characters/edit', {character: record})
  })
}

var updateCharacter = App.command('character/update')()
function update(req,res) {
  updateCharacter(
    req.params.id
  , req.body.character
  , function onSuccess() {
      req.flash('notice', 'Ye hath updated your character')
      res.redirect('/portal/characters/' + req.params.id)
    }
  , function onError() {
      res.render('portal/characters/edit', {character:record, flash:{error: 'Oopseth!  There wast a problem update your character.'}})
    }
  )
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
