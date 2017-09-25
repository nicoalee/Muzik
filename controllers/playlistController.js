const request = require('request')
const Playlist = require('../models/Playlist')
const User = require('../models/User')
const tokenUrl = 'https://accounts.spotify.com/api/token'

function getAuthToken (req, res) {
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
}

function create (req, res) {
  var newPlaylist = new Playlist({
    name: req.body.playlistName
  })
  newPlaylist.save(function (err, createdPlaylist) {
    if (err) return res.send(err)
    User.findById(req.user.id, function (err, user) {
      if (err) return res.send(err)
      user.playlists.push(createdPlaylist.id)
      user.save()
      req.flash('msg', 'New Playlist successfully created!')
      res.redirect('/playlist/create')
    })
  })
}

function show (req, res) {
  User.findById(req.user.id)
  .populate({
    path: 'playlists',
    model: 'Playlist',
    populate: {
      path: 'songs',
      model: 'Song'
    }
  })
  .exec(function (err, user) {
    res.render('playlist/list', {
      playlists: user.playlists
    })
  })
}

function destroy (req, res) {
  Playlist.findById(req.body.playlistId, function (err, playlist) {
    if (err) return res.send(err)
    // console.log(playlist.songs)
    // console.log('song id: ' + req.body.songId)
    var index = playlist.songs.indexOf(req.body.songId)
    playlist.songs.splice(index, 1)
    playlist.save()
    res.send({status: 'ok'})
  })
}

module.exports = {
  getAuthToken,
  create,
  show,
  destroy
}
