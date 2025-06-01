const request = require('supertest');
const app = require('../app');

describe('Board Access', () => {
  it('should block access without token', async () => {
    const res = await request(app).get('/api/boards');
    expect(res.statusCode).toBe(401); // Unauthorized
  }, 10000);
});
