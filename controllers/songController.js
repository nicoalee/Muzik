const Song = require('../models/Song')
const qs = require('querystring')
const Playlist = require('../models/Playlist')

function create (req, res) {
  // borrowed function which gets query from req
  var body = ''
  req.on('data', function (data) {
    body += data
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
    if (body.length > 1e6) {
                // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
      req.connection.destroy()
    }
  })
  req.on('end', function () {
    var query = qs.parse(body)
    Playlist.findById(req.session.playlist, function (err, playlist) {
      if (err) return res.send(err)
      var newSong = new Song({
        name: query.name,
        artist: query.artist,
        album: query.album
      })
      newSong.save(function (err, newSong) {
        if (err) return res.send(err)
        playlist.songs.push(newSong.id)
        playlist.save()
        res.send({
          status: 'ok',
          message: 'New song successfully added!'
        })
      })
    })
  })
}

module.exports = {
  create
}
