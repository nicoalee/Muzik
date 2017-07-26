const User = require('../models/User')
const passport = require('../config/passport')

function create (req, res) {
  // findorcreate

  // if user exists
  User.findOne({email: req.body.user.email}, function (err, doc) {
    if (err) return res.send(err)

    if (doc) {
      req.flash('msg', 'The email entered already exists')
      res.redirect('/user')
    } else {
      var newUser = new User({
        name: req.body.user.name,
        email: req.body.user.email,
        password: req.body.user.password
      })

      newUser.save(function (err, createdUser) {
        if (err) {
          if (err.errors.name) req.flash('msg', JSON.stringify(err.errors.name.message))
          if (err.errors.email) req.flash('msg', JSON.stringify(err.errors.email.message))
          if (err.errors.password) req.flash('msg', JSON.stringify(err.errors.password.message))
          return res.redirect('/user/new') // flash set
        }
        passport.authenticate('local', {
          successRedirect: '/user/new'
          // req.flash('msg', 'User succesfully created! Please log in below.') // flash set
        })(req, res)
      })
    }
  })
}

function logout (req, res) {
  req.logout()
  res.redirect('/user')
}

module.exports = {
  create,
  logout
}
