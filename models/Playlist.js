const Song = require('./Song')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playlistSchema = new Schema({
  name: String,
  songs: [{
    type: Schema.Types.ObjectId,
    ref: 'Song' // tell mongoose to populate 'Song' model
  }]
})

const Playlist = mongoose.model('Playlist', playlistSchema)

module.exports = Playlist
