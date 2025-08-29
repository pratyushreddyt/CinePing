require('./config/env');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/alerts', require('./routes/alerts'));

// Basic route for the home page to confirm server is running.
app.get('/', (req, res) => {
  res.send('CinePing backend service is running. 🚀');
});

module.exports = app;