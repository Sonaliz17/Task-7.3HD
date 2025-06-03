const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

// Increase timeout
jest.setTimeout(10000);

describe('Auth API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/taskmanager', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return 401 for invalid login', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'wrong@example.com', password: 'wrongpass' });

    expect(res.statusCode).toBe(401);
  });
});

