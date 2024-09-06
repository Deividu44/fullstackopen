const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3
  },
  favoriteGenre: {
    type: String,
    required: true,
    minLength: 2
  }
})

module.exports = mongoose.model('User', schema)