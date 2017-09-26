const express = require('express')
var router = express.Router()
const songController = require('../controllers/songController')

function authenticatedUser (req, res, next) {
  if (req.isAuthenticated()) return next()
  req.flash('msg', 'Must be logged in to access!')
  return res.redirect('/user')
}

// function unAuthenticatedUser (req, res, next) {
//   if (!req.isAuthenticated()) return next()
//   // Otherwise
//   req.flash('msg', 'You are already logged in!')
//   return res.redirect('/playlist')
// }

router.route('/')
  .post(authenticatedUser, songController.create)

router.route('/delete')
  .post(authenticatedUser, songController.destroy)

module.exports = router
