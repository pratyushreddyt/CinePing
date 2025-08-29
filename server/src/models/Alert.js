const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie: { type: String, required: true },
  theatre: { type: String, required: true },
  city: { type: String, required: true },
  language: { type: String, required: true },
  triggered: { type: Boolean, default: false },
});

module.exports = mongoose.model('Alert', AlertSchema);
