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

router.route('/')
  .get(authenticatedUser, playlistController.show)

router.route('/create')
  .get(authenticatedUser, playlistController.getAuthToken)
  .post(authenticatedUser, playlistController.create)

router.route('/delete')
  .post(authenticatedUser, playlistController.destroy)

router.route('/edit')
  .post(authenticatedUser, playlistController.edit)

module.exports = router
