const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');

const UserRoutes = require('./routes/userRoutes');
const app = express();
const TaskSchema = require('./model/taskModel');

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
app.get('/', (req, res) => {
  res.send('Welcome to the Task Management API');
});

app.post('/tasks', async (req, res) => {
  const { title, description , completed} = req.body;
  try {
    const task = new TaskSchema({ title, description , completed});
    await task.save();
    res.status(201).send('Task created successfully');
  } catch (error) {
    res.status(400).send('Error creating task');
  }
});


app.get('/tasks', async (req, res) => {
  try {
    const tasks = await TaskSchema.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send('Error fetching tasks');
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await TaskSchema.findByIdAndDelete(id);
    res.status(200).send('Task deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting task');
  }
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})