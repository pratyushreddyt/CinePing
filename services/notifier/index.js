const { sendEmail } = require('./email');
const { sendSms, sendWhatsApp } = require('./sms');
const { sendPushNotification } = require('./push');
const NotificationLog = require('../../models/NotificationLog');

exports.sendNotification = async (userId, type, message, destination) => {
  let status = false;
  switch (type) {
    case 'email':
      status = await sendEmail(destination, message.subject, message.html);
      break;
    case 'sms':
      status = await sendSms(destination, message.body);
      break;
    case 'whatsapp':
      status = await sendWhatsApp(destination, message.body);
      break;
    case 'push':
      status = await sendPushNotification(destination, message.title, message.body);
      break;
    default:
      console.error(`Unknown notification type: ${type}`);
  }

  // Log the notification attempt
  await NotificationLog.create({
    userId,
    type,
    status: status ? 'sent' : 'failed',
    message: JSON.stringify(message),
    timestamp: new Date()
  });
};