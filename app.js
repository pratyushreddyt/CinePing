const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Import routes
const notificationsRouter = require('./routes/notifications');

// Connect to MongoDB
mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB connected successfully. 🟢'))
  .catch(err => console.error('MongoDB connection error: 🔴', err));

// Mount your API routes
app.use('/api/notifications', notificationsRouter);

// Basic route for the home page
app.get('/', (req, res) => {
  res.send('Notifier service is running.');
});

// Start the server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}. 🚀`);
});