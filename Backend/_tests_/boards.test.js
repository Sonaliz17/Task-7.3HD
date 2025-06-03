const request = require('supertest');
const app = require('../app');

describe('Board API (unauthorized)', () => {
  it('should return 401 for unauthenticated board access', async () => {
    const res = await request(app).get('/api/boards');
    expect(res.statusCode).toBe(401);
  });
});

