const request = require('supertest');
const app = require('../app');

// Mock only User model
jest.mock('../models/User', () => ({
  findOne: jest.fn().mockResolvedValue(null),
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
