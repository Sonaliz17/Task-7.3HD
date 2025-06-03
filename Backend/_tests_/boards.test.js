// Backend/_tests_/boards.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const Board = require('../models/Board');
const jwt = require('jsonwebtoken');

let server;
let token;
let userId;
let boardId;

beforeAll(async () => {
  const mongoUri = 'mongodb://127.0.0.1:27017/test-db';
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

  const user = new User({ email: 'test@example.com', password: 'hashedpassword' });
  await user.save();
  userId = user._id;
  token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'testsecret');

  server = app.listen(4000);
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
  server.close();
});

describe('Boards API', () => {
  test('Create board', async () => {
    const res = await request(app)
      .post('/api/boards')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Project Board' });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Project Board');
    boardId = res.body._id;
  });

  test('Get all boards', async () => {
    const res = await request(app)
      .get('/api/boards')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Update board name', async () => {
    const res = await request(app)
      .put(`/api/boards/${boardId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated Board' });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Updated Board');
  });

  test('Add task to board', async () => {
    const res = await request(app)
      .post(`/api/boards/${boardId}/tasks`)
      .set('Authorization', `Bearer ${token}`)
      .send({ text: 'First Task' });

    expect(res.statusCode).toBe(200);
    expect(res.body[0].text).toBe('First Task');
  });

  test('Get tasks for board', async () => {
    const res = await request(app)
      .get(`/api/boards/${boardId}/tasks`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('Update task in board', async () => {
    const board = await Board.findById(boardId);
    const taskId = board.tasks[0]._id;

    const res = await request(app)
      .put(`/api/boards/${boardId}/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ text: 'Updated Task', completed: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.text).toBe('Updated Task');
    expect(res.body.completed).toBe(true);
  });

  test('Delete task from board', async () => {
    const board = await Board.findById(boardId);
    const taskId = board.tasks[0]._id;

    const res = await request(app)
      .delete(`/api/boards/${boardId}/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Task deleted');
  });

  test('Delete board', async () => {
    const res = await request(app)
      .delete(`/api/boards/${boardId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Board deleted');
  });
});
