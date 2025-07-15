// server.js

// Load environment variables
require('dotenv').config();

// Import core modules
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: ['https://nature-grocery-web-application.vercel.app'], // ✅ No trailing slash
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('✅ Backend is working properly');
});

// Register API routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
