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

router.post('/new', function (req, res) {
  var authOptions = {
    url: tokenUrl,
    headers: {
      'Authorization': process.env.SPOTIFY_API_IDSECRET
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  }

  // spotify returns token, which then gets passed into callback (body)
  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
    // use the access token to access the Spotify Web API
      token = body.access_token

      var options = {
        url: 'https://api.spotify.com/v1/search?q=Brokenbells&type=artist',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      }
      // send options to spotify link and body is the callback
      request.get(options, function (error, response, body) {
        if (error) return error
      })
    }
  })
})

module.exports = router
