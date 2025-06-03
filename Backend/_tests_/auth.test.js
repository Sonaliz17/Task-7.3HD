const request = require('supertest');
const app = require('../app');

// Mock only the User model
jest.mock('../models/User', () => ({
  findOne: jest.fn().mockResolvedValue(null),  // simulate "user not found"
}));

describe('Auth API', () => {
  it('should return 401 for invalid login', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'invalid@example.com', password: 'wrongpass' });

    expect(res.statusCode).toBe(401);
    console.log('DEBUG response body:', res.body); // 👈 Add this if still failing
    expect(res.body).toHaveProperty('message', 'Invalid credentials');
  });
});
