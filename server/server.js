// Load environment variables
require('dotenv').config();

// Import required modules
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

connectDB();

// Middleware
app.use(cors(
  {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }
));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Backend is working');
});

// API Routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

