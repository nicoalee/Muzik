const Song = require('../models/Song')
const Playlist = require('../models/Playlist')

function create(req, res) {
  // Playlist.find().sort('-created_at').exec(function(err, post) {
  // })
  Playlist.findById(req.session.playlist, function(err, playlist) {
    if (err) return res.send(err)

    var newSong = new Song({
      name: req.body.name,
      artist: req.body.artist,
      album: req.body.album,
      embed: req.body.embed
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
}

function destroy (req, res) {
  Playlist.findById(req.body.playlistId, function (err, playlist) {
    if (err) return res.send(err)
    // console.log(playlist.songs)
    // console.log('song id: ' + req.body.songId)
    var index = playlist.songs.indexOf(req.body.songId)
    playlist.songs.splice(index, 1)
    Song.findById(req.body.songId, function(err, song){
      if(err) return res.send(err)
      song.remove()
    })
    playlist.save()
    res.send({status: 'ok'})
  })
}

module.exports = {
  create,
  destroy
}
