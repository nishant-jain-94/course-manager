const express = require('express');
const mongoose = require('mongoose');
const course = require('./course');
const config = require('./app.config');

mongoose.connect(config.MONGODB_URL, { autoReconnect: true, useNewUrlParser: true });

const app = express();

app.use(express.static('public'));
app.use(course);

module.exports = app;
