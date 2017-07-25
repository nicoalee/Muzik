const mongoose = require('mongoose')
const Schema = mongoose.Schema

const songSchema = new Schema({
  name: String,
  artist: String,
  album: String
})

const Song = mongoose.model('Song', songSchema)

module.exports = Song
