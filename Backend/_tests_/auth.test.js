const request = require('supertest');
const app = require('../app');

describe('Auth Routes', () => {
  const testEmail = 'jest@example.com';
  const testPassword = 'securepass';

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: testEmail, password: testPassword });

    expect(res.statusCode).toBe(201);
  }, 10000); // Increase timeout

  it('should not login with wrong credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testEmail, password: 'wrongpass' });

    expect(res.statusCode).toBe(400);
  }, 10000); // Increase timeout
});
