function index(req,res) {
  var beasts = [
    {id: 1, name: 'Ogre',            strength: 6,  hp: 12, gold: 5} 
  , {id: 2, name: 'Gelatinous Cube', strength: 2,  hp: 6,  gold: 2} 
  , {id: 3, name: 'Demon Cat',       strength: 12, hp: 18, gold: 6} 
  ]

  res.render('bestiary/index',{beasts:beasts, title: 'Bestiary - NodeSlash'})
}

exports.index = index
