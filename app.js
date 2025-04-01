const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const UserSchema = require('./model/model');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
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
    const user = new UserSchema({ name, email, password });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(400).send('Error registering user');
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})