const express = require('express')
var router = express.Router()
const playlistController = require('../controllers/playlistController')

function authenticatedUser (req, res, next) {
  if (req.isAuthenticated()) return next()
  req.flash('msg', 'Must be logged in to access!')
  return res.redirect('/user')
}

function unAuthenticatedUser (req, res, next) {
  if (!req.isAuthenticated()) return next()
  // Otherwise
  req.flash('msg', 'You are already logged in!')
  return res.redirect('/playlist')
}

// authentications------------------------------------------

router.route('/')
  .get(authenticatedUser, function (req, res) {
    res.render('playlist/list')
  })

router.route('/new')
  .get(authenticatedUser, playlistController.create)

module.exports = router
