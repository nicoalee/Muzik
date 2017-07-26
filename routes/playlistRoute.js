const express = require('express')
var router = express.Router()
const userController = require('../controllers/playlistController')
const passport = require('../config/passport')
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

router.route('/logout')
  .get(authenticatedUser, playlistController.logout)

router.route('/')
  .get(authenticatedUser, function (req, res) {
    res.render('playlist/createPlaylist')
  })

module.exports = router
