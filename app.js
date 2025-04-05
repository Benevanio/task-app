const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');

const UserRoutes = require('./routes/userRoutes');
const TaskRoutes = require('./routes/taskRoutes');
const app = express();

mongoose.connect(process.env.MONGO_URL) 
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use('/api', UserRoutes);
app.use('/api', TaskRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the Task Management API');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})