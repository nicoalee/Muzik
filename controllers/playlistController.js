const passport = require('../config/passport')

function create (req, res) {
  res.render('playlist/create')
}

module.exports = {
  create
}
