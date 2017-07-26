const passport = require('../config/passport')

function logout (req, res) {
  req.logout()
  req.flash('msg', 'Logged out successfully!')
  res.redirect('/user')
}

module.exports = {
  logout
}
