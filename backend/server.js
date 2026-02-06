const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/todoapp')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Middleware
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// API routes
const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
