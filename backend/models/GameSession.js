const mongoose = require('mongoose');

const gameSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  character1: {
    name: String,
    gameClass: String,
    power: Number
  },
  character2: {
    name: String,
    gameClass: String,
    power: Number
  },
  winner: {
    name: String,
    gameClass: String
  },
  duration: {
    type: Number, // in seconds
    default: 0
  },
  moves: [{
    character: String,
    move: String,
    damage: Number,
    timestamp: { type: Date, default: Date.now }
  }],
  experienceGained: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GameSession', gameSessionSchema);