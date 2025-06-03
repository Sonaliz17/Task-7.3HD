const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // Adjust path if needed

let mongoServer;

beforeAll(async () => {
  // Increase timeout for MongoDB startup
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}, 20000); // 20 seconds timeout

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

describe('Auth Routes', () => {
  const testEmail = 'test@example.com';
  const testPassword = 'securepass';

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: testEmail, password: testPassword });
    expect(res.statusCode).toBe(201);
  }, 10000); // Increase test timeout

  it('should not login with wrong credentials', async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: testEmail, password: 'wrongpass' });
  expect(res.statusCode).toBe(401); // <-- FIXED
}, 10000);

  it("should fail login with wrong password", async () => {
  const res = await request(app).post("/api/auth/login").send({ email: "test@test.com", password: "wrong" });
  expect(res.statusCode).toBe(401);

});
