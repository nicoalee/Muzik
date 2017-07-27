const express = require('express')
var router = express.Router()
const userController = require('../controllers/userController')
var passport = require('../config/passport')

function authenticatedUser (req, res, next) {
  if (req.isAuthenticated()) return next()

  req.flash('msg', 'Must be logged in to access!')
  return res.redirect('/user')
}

function unAuthenticatedUser (req, res, next) {
  if (!req.isAuthenticated()) return next()

  // Otherwise
  req.flash('msg', 'You are already logged in. Cannot go to register or log in page!')
  return res.redirect('/playlist')
}

router.route('/')
  .get(unAuthenticatedUser, function (req, res) {
    res.render('user/login', {
    // flash: req.flash('msg')
    }) // get flash but don't need because we set locals using middleware
  })
  .post(passport.authenticate('local', {
    successRedirect: '/playlist',
    failureRedirect: '/user'
  }))

router.route('/logout')
  .get(authenticatedUser, userController.logout)

router.route('/new')
  .get(unAuthenticatedUser, function (req, res) {
    res.render('user/register') // get flash
  })
  .post(userController.create)

module.exports = router
