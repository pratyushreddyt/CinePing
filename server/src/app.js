require('./config/env');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/alerts', require('./routes/alerts'));

module.exports = app;
