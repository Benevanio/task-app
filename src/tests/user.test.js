const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'beneteasladeva@gmail.com' && password === 'da') {
    return res.status(200).json({
      message: 'Login successful',
      token: 'fake-jwt-token'
    });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

test('Return a login response', async () => {
  const response = await request(app)
    .post('/login')
    .send({
      email: 'beneteasladeva@gmail.com',
      password: 'da'
    });

  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('message', 'Login successful');
  expect(response.body).toHaveProperty('token');
});
