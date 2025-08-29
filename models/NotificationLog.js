const mongoose = require('mongoose');

const notificationLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to your User model
    required: true
  },
  type: {
    type: String,
    enum: ['email', 'sms', 'whatsapp', 'push'],
    required: true
  },
  status: {
    type: String,
    enum: ['sent', 'failed'],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('NotificationLog', notificationLogSchema);