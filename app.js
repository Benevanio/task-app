const express = require('express');
const mongoose = require('mongoose');
const UserRoutes = require('./src/routes/userRoutes');
const TaskRoutes = require('./src/routes/taskRoutes');
const dotenv = require('dotenv');
dotenv.config();
require('dotenv').config({ path: '.env.test' });

const app = express();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', UserRoutes);
app.use('/api', TaskRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Task Management API');
});

module.exports = app;
