const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const ErrorHandler = require('../middleware/error'); // Adjust path if needed

const app = express();

// CORS configuration matching your app.js
const hosts = 'localhost';
app.use(cors({
  origin: [`http://${hosts}:3000`],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Import routes (adjust paths to match your structure)
const user = require('../controller/user');
const product = require('../controller/product');
const order = require('../controller/order');

// Mount routes
app.use('/api/v2/user', user);
app.use('/api/v2/product', product);
app.use('/api/v2/order', order);

// Error handling middleware
app.use(ErrorHandler);

module.exports = app;