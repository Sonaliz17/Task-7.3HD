const request = require('supertest');
const app = require('../app');

// ONLY mock mongoose.connect and mongoose.connection.close
jest.mock('mongoose', () => {
  const actualMongoose = jest.requireActual('mongoose');
  return {
    ...actualMongoose,
    connect: jest.fn(),
    connection: { close: jest.fn() }
  };
});

// Mock User model only
jest.mock('../models/User', () => ({
  findOne: jest.fn().mockResolvedValue(null)
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
