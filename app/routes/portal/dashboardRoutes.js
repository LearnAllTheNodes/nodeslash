var loadContext = App.presenter('dashboardPresenter')

function index(req,res) {
  loadContext(req.user, function(err,dashboard) {
    res.render('portal/dashboard/index', {context: dashboard})
  })
}

exports.index = index
