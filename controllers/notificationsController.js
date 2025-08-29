const NotificationLog = require('../models/NotificationLog');

exports.getNotificationHistory = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have user authentication
    const history = await NotificationLog.find({ userId })
      .sort({ timestamp: -1 }) // Sort by most recent first
      .limit(50); // Limit the results for performance

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching history', error });
  }
};