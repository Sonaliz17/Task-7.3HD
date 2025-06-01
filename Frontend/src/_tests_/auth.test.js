const request = require('supertest');
const app = require('../server'); // ensure this exports your Express app

describe('Auth Routes', () => {
  const testEmail = 'hdtest@example.com';
  const testPassword = 'securepass';

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: testEmail, password: testPassword });
    expect(res.statusCode).toBe(201);
  });

  it('should not login with wrong credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testEmail, password: 'wrongpass' });
    expect(res.statusCode).toBe(400);
  });
});
