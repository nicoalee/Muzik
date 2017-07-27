const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

// takes user id and stores it in req.session.passport.user
passport.serializeUser(function (user, next) {
  console.log('entered')
  next(null, user.id)
})

// passport takes the id given and looks it up in database
passport.deserializeUser(function (id, next) {
  User.findById(id, function (err, user) {
    next(err, user)
  })
})

// local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'user[email]',
      passwordField: 'user[password]',
      passReqToCallback: true
    },
    localVerify
  )
)

// verify callback for local strategy. Goes to failureRedirect if err, and goes to successRedirect if it works
function localVerify (req, passportEmail, passportPassword, next) {
  User
  .findOne({
    // finds email
    email: passportEmail
  })
  .exec(function (err, foundUser) {
    if (err) {
      req.flash('msg', 'There was an error. Please try again')
      return next(err) // go to failureRedirect
    }
    // takes found use (found by email) and tests their password
    if (!foundUser || !foundUser.validPassword(passportPassword)) {
      req.flash('msg', 'Incorrect email or password')
      next(null, false) // go to failure redirect
    } else {
      console.log('success, redirect to /profile')
      req.flash('msg', 'Successfully logged in')
      next(null, foundUser) // go to successRedirect
    }
  })
}

module.exports = passport
