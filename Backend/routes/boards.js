const express = require('express');
const Board = require('../models/Board');
const auth = require('../middleware/auth');
const router = express.Router();

// Helper to find board by ID
async function findBoard(req, res, param = 'id') {
  try {
    const board = await Board.findOne({ _id: req.params[param], user: req.user.id });
    if (!board) {
      res.status(404).json({ error: 'Board not found' });
      return null;
    }
    return board;
  } catch (err) {
    res.status(500).json({ error: err.message });
    return null;
  }
}

// Get all boards
router.get('/', auth, async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user.id });
    res.json(boards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new board
router.post('/', auth, async (req, res) => {
  try {
    const board = new Board({ name: req.body.name, user: req.user.id });
    await board.save();
    res.status(201).json(board);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update board
router.put('/:id', auth, async (req, res) => {
  try {
    const board = await findBoard(req, res);
    if (!board) return;

    board.name = req.body.name || board.name;
    await board.save();
    res.json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete board
router.delete('/:id', auth, async (req, res) => {
  try {
    const board = await findBoard(req, res);
    if (!board) return;

    await board.deleteOne();
    res.json({ message: 'Board deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get tasks
router.get('/:id/tasks', auth, async (req, res) => {
  try {
    const board = await findBoard(req, res);
    if (!board) return;
    res.json(board.tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add task
router.post('/:id/tasks', auth, async (req, res) => {
  try {
    const board = await findBoard(req, res);
    if (!board) return;

    board.tasks.push({ text: req.body.text });
    await board.save();
    res.status(201).json(board.tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update task
router.put('/:boardId/tasks/:taskId', auth, async (req, res) => {
  try {
    const board = await findBoard(req, res, 'boardId');
    if (!board) return;

    const task = board.tasks.id(req.params.taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.text = req.body.text ?? task.text;
    task.completed = req.body.completed ?? task.completed;

    await board.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete task
router.delete('/:boardId/tasks/:taskId', auth, async (req, res) => {
  try {
    const board = await findBoard(req, res, 'boardId');
    if (!board) return;

    const task = board.tasks.id(req.params.taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.remove();
    await board.save();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;



