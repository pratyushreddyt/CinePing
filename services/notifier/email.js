const nodemailer = require('nodemailer');

// Configure your email transporter (e.g., using Gmail or another SMTP service)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_app_password' // Use an app password for security
  }
});

exports.sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: 'your_email@gmail.com',
      to,
      subject,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};