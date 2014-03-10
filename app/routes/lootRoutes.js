var ItemTemplate = App.model('itemTemplate')
exports.index = function index(req,res) {
  ItemTemplate.find({}, function(err,records) {
    if (err) return res.status(422).send('Problem loading the records:', err.message)

    res.render('loot/index', {title: 'All the lewtz - Node Slash', loots: records})
  })
}

exports.show = function showLoot(req,res) {
  var id = req.params.id

  ItemTemplate.findById(id, function(err, loot) {
    if (err) return res.status(422).send('Problem loading the loot:', err.message)
    if (!loot) return res.status(404).send('Could not find the loot')

    res.render('loot/show', {loot: loot})
  })
}
