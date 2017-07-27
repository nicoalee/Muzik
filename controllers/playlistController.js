const passport = require('../config/passport')
const request = require('request')
const tokenUrl = 'https://accounts.spotify.com/api/token'

function create (req, res) {
  var potentialToken = ''
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
      // token stored in body
      req.session.token = body.access_token
      res.render('./playlist/create', {token: req.session.token})
    }
  })

  // res.render('./playlist/create')
}

module.exports = {
  create
}
