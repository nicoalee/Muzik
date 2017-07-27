const passport = require('../config/passport')
const request = require('request')
const tokenUrl = 'https://accounts.spotify.com/api/token'

function create (req, res) {
  res.render('./playlist/create')
}

module.exports = {
  create
}
