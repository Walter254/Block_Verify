// Import necessary libraries
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const contentRoutes = require('./routes/contentRoutes'); // Import content routes
const userRoutes = require('./routes/userRoutes'); // Import user routes
const uploadRoutes = require('./routes/uploadRoutes'); // Import upload routes
const { expressjwt: jwt } = require('express-jwt'); // Import express-jwt for JWT middleware

// Initialize dotenv to use .env file variables
dotenv.config();

// Setup Express app
const app = express();
const PORT = process.env.PORT || 3002; // Use port from environment variable or default to 3002

// Middleware to parse JSON requests
app.use(express.json());

const path = require('path');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'src')));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

// Simple GET route "/api/ping" to ensure the server is running
app.get('/api/ping', (req, res) => {
  console.log('Received request on /api/ping');
  res.json({ status: 'success', message: 'pong' });
});

// Use content routes for API endpoints
app.use('/api/content', contentRoutes);

// Use user routes for API endpoints
app.use('/api/users', userRoutes);

// Use upload routes for API endpoints
app.use('/api/upload', uploadRoutes);

// JWT middleware to protect routes
// app.use(jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'], requestProperty: 'auth' }).unless({ path: ['/api/users/register', '/api/users/login', '/api/ping'] }));

// Error handling for unauthorized errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Invalid token' });
  } else {
    next(err);
  }
});

// Start the server with error handling
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (error) => {
  console.error('Error starting server:', error);
});