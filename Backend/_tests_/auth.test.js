const request = require('supertest');
const app = require('../app'); // Ensure app.js exports the Express app

describe('Auth API', () => {
  it('should fail login with wrong credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'wrong@example.com', password: 'wrongpass' });

    expect(res.statusCode).toBe(401);
  });
});


