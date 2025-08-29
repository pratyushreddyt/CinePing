const Alert = require('../models/Alert');

exports.createAlert = async (req, res) => {
  try {
    const { movie, theatre, city, language } = req.body;
    const alert = new Alert({
      userId: req.user.userId,
      movie,
      theatre,
      city,
      language,
    });
    await alert.save();
    res.status(201).json(alert);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ userId: req.user.userId });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteAlert = async (req, res) => {
  try {
    const { id } = req.params;
    const alert = await Alert.findOneAndDelete({ _id: id, userId: req.user.userId });
    if (!alert) return res.status(404).json({ message: 'Alert not found' });
    res.json({ message: 'Alert deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
