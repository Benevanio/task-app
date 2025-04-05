const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const app = express();
const UserSchema = require('./model/userModel');
const TaskSchema = require('./model/taskModel');

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserSchema({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered successfully');

  } catch (error) {
    res.status(400).send('Error registering user'+ error);
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await UserSchema.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
});

app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await UserSchema.findByIdAndDelete(id);
    res.status(200).send('User deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting user');
  }
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