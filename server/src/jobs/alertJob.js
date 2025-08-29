const cron = require('node-cron');
const Alert = require('../models/Alert');
const User = require('../models/User');
const NotificationHistory = require('../models/NotificationHistory');
const providerService = require('../services/providerService');
const notifierService = require('../services/notifierService');

const runAlertJob = () => {
	cron.schedule('*/2 * * * *', async () => {
		console.log('Cron job running: Checking alerts...');
		try {
			const alerts = await Alert.find({ triggered: false });
			for (const alert of alerts) {
				const available = await providerService.checkAvailability(alert);
				if (available) {
					const user = await User.findById(alert.userId);
					await notifierService.sendEmail(
						user.email,
						`Movie Available: ${alert.movie}`,
						`Your movie "${alert.movie}" is now available at ${alert.theatre}, ${alert.city} (${alert.language})!`
					);
					alert.triggered = true;
					await alert.save();
					await NotificationHistory.create({
						userId: user._id,
						alertId: alert._id,
						channel: 'email',
						sentAt: new Date(),
					});
					console.log(`Alert triggered and email sent for alertId: ${alert._id}`);
				}
			}
		} catch (err) {
			console.error('Cron job error:', err);
		}
	});
};

module.exports = runAlertJob;
