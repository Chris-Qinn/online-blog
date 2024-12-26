require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');
const { mongoURI } = require('./config/database');
const mongoose = require('mongoose');
const { mongoURI, options } = require('./config/database');

const User = require('./models/User');
const Blog = require('./models/Blog');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());  // Enable CORS for all routes
app.use(express.json());  // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Connect to MongoDB
mongoose.connect(mongoURI, options)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/blogs', blogRoutes);  // Blog-related routes

// Serve the main HTML file for any route not handled by the API
// This is necessary for single-page applications
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;  // Export for testing purposes