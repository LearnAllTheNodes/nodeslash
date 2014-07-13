var loadContext = App.presenter('dashboardPresenter')

function index(req,res) {
  loadContext(req.user, function(err,dashboard) {
    res.render('app/dashboard/index', {context: dashboard})
  })
}

exports.index = index
