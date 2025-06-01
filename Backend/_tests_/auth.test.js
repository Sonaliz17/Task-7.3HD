const request = require('supertest');
const app = require('../app'); // adjust the path if needed

describe('Auth Routes', () => {
  const testEmail = 'testuser@example.com';
  const testPassword = 'securepass';

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: testEmail, password: testPassword });

    expect(res.statusCode).toBe(201); // Created
  }, 10000); // <-- set timeout to 10s

  it('should not login with wrong credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testEmail, password: 'wrongpass' });

    expect(res.statusCode).toBe(400); // Bad Request
  }, 10000); // <-- set timeout to 10s
});
