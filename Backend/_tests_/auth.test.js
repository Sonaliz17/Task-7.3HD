const request = require('supertest');
const app = require('../app');

// Mock the Mongoose User model and connection
jest.mock('mongoose', () => ({
  connect: jest.fn(),
  connection: { close: jest.fn() }
}));

jest.mock('../models/User', () => ({
  findOne: jest.fn().mockResolvedValue(null)  // simulate user not found
}));

describe('Auth API', () => {
  it('should return 401 for invalid login', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'invalid@example.com', password: 'wrongpass' });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message', 'Invalid credentials');
  });
});

