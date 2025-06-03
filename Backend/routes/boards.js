const express = require('express');
const Board = require('../models/Board');
const auth = require('../middleware/auth');
const router = express.Router();

// 🔧 Helper: Handle errors
const handleError = (res, message = 'Server Error', code = 500) =>
  res.status(code).json({ error: message });

// 🔧 GET all boards
router.get('/', auth, async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user.id });
    res.json(boards);
  } catch (err) {
    handleError(res, err.message);
  }
});

// 🔧 POST new board
router.post('/', auth, async (req, res) => {
  try {
    const board = new Board({ name: req.body.name, user: req.user.id });
    await board.save();
    res.status(201).json(board);
  } catch (err) {
    handleError(res, err.message);
  }
});

// 🔧 PUT update board
router.put('/:id', auth, async (req, res) => {
  try {
    const board = await Board.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { name: req.body.name },
      { new: true }
    );
    if (!board) return handleError(res, 'Board not found', 404);
    res.json(board);
  } catch (err) {
    handleError(res, err.message);
  }
});

// 🔧 DELETE board
router.delete('/:id', auth, async (req, res) => {
  try {
    const board = await Board.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!board) return handleError(res, 'Board not found', 404);
    res.send('Board deleted');
  } catch (err) {
    handleError(res, err.message);
  }
});

// 🔧 GET all tasks for a board
router.get('/:id/tasks', auth, async (req, res) => {
  try {
    const board = await Board.findOne({ _id: req.params.id, user: req.user.id });
    if (!board) return handleError(res, 'Board not found', 404);
    res.json(board.tasks);
  } catch (err) {
    handleError(res, err.message);
  }
});

// 🔧 POST new task
router.post('/:id/tasks', auth, async (req, res) => {
  try {
    const board = await Board.findOne({ _id: req.params.id, user: req.user.id });
    if (!board) return handleError(res, 'Board not found', 404);
    board.tasks.push({ text: req.body.text });
    await board.save();
    res.json(board.tasks);
  } catch (err) {
    handleError(res, err.message);
  }
});

// 🔧 PUT update task
router.put('/:boardId/tasks/:taskId', auth, async (req, res) => {
  try {
    const board = await Board.findOne({ _id: req.params.boardId, user: req.user.id });
    const task = board?.tasks.id(req.params.taskId);
    if (!task) return handleError(res, 'Task not found', 404);
    task.text = req.body.text ?? task.text;
    task.completed = req.body.completed ?? task.completed;
    await board.save();
    res.json(task);
  } catch (err) {
    handleError(res, err.message);
  }
});

// 🔧 DELETE task
router.delete('/:boardId/tasks/:taskId', auth, async (req, res) => {
  try {
    const board = await Board.findOne({ _id: req.params.boardId, user: req.user.id });
    const task = board?.tasks.id(req.params.taskId);
    if (!task) return handleError(res, 'Task not found', 404);
    task.remove();
    await board.save();
    res.send('Task deleted');
  } catch (err) {
    handleError(res, err.message);
  }
});

module.exports = router;


