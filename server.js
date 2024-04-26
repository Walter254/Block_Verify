const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
require('dotenv').config();
const port = process.env.PORT || 3003;

// Global unhandled promise rejection handler
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Use CORS middleware to allow cross-origin requests
// Customize the options as needed for your environment
app.use(cors({
  origin: '*',  // Adjust this to be more restrictive as necessary
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist'))); // Updated to serve files from 'dist'

// Example async route with proper error handling
app.post('/api/content/upload', async (req, res) => {
  try {
    // Simulate async operation, e.g., database call or external API call
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    res.json({ message: 'Content uploaded successfully' });
  } catch (error) {
    console.error('Error uploading content:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/content', (req, res) => {
  // Simulate fetching data
  const data = [{ title: "Example Title", description: "Example Description" }];
  res.json(data);
});

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html')); // Updated path to 'dist'
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}).on('error', (error) => {
  console.error('Error starting server:', error);
  process.exit(1);
});
