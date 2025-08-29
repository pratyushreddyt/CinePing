const twilio = require('twilio');

const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const client = new twilio(accountSid, authToken);

exports.sendSms = async (to, body) => {
  try {
    const message = await client.messages.create({
      body,
      from: 'YOUR_TWILIO_PHONE_NUMBER',
      to
    });
    console.log('SMS sent:', message.sid);
    return true;
  } catch (error) {
    console.error('Error sending SMS:', error);
    return false;
  }
};

exports.sendWhatsApp = async (to, body) => {
  try {
    const message = await client.messages.create({
      body,
      from: 'whatsapp:YOUR_TWILIO_WHATSAPP_NUMBER',
      to: `whatsapp:${to}`
    });
    console.log('WhatsApp message sent:', message.sid);
    return true;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    return false;
  }
};