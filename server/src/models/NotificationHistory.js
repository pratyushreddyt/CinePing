const mongoose = require('mongoose');

const NotificationHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  alertId: { type: mongoose.Schema.Types.ObjectId, ref: 'Alert', required: true },
  channel: { type: String, default: 'email' },
  sentAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('NotificationHistory', NotificationHistorySchema);
