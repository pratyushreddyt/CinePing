const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notificationsController');
const { verifyToken } = require('../middlewares/auth'); // A middleware for authentication

// GET /api/notifications/history
router.get('/history', verifyToken, notificationsController.getNotificationHistory);

module.exports = router;