const request = require('supertest');
const app = require('../server');

describe('Board Access', () => {
  it('should block access without token', async () => {
    const res = await request(app).get('/api/boards');
    expect(res.statusCode).toBe(401);
  });
});
