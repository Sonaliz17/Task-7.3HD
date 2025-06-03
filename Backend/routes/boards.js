const express = require('express');
const Board = require('../models/Board');
const auth = require('../middleware/auth');
const router = express.Router();

// Boards CRUD
router.get('/', auth, async (req, res) => {
  const boards = await Board.find({ user: req.user.id });
  res.json(boards);
});

router.post('/', auth, async (req, res) => {
  const board = new Board({ name: req.body.name, user: req.user.id });
  await board.save();
  res.status(201).json(board);
});

router.put('/:id', auth, async (req, res) => {
  const board = await Board.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { name: req.body.name },
    { new: true }
  );
  if (!board) return res.status(404).send('Board not found');
  res.json(board);
});

router.delete('/:id', auth, async (req, res) => {
 async function findBoard(req) {
  return await Board.findOne({ _id: req.params.id, user: req.user.id });
}
  if (!board) return res.status(404).send('Board not found');
  res.send('Board deleted');
});

// Tasks CRUD
router.get('/:id/tasks', auth, async (req, res) => {
  const board = await Board.findOne({ _id: req.params.id, user: req.user.id });
  if (!board) return res.status(404).send('Board not found');
  res.json(board.tasks);
});

router.post('/:id/tasks', auth, async (req, res) => {
  const board = await Board.findOne({ _id: req.params.id, user: req.user.id });
  if (!board) return res.status(404).send('Board not found');
  board.tasks.push({ text: req.body.text });
  await board.save();
  res.json(board.tasks);
});

router.put('/:boardId/tasks/:taskId', auth, async (req, res) => {
  const board = await Board.findOne({ _id: req.params.boardId, user: req.user.id });
  const task = board?.tasks.id(req.params.taskId);
  if (!task) return res.status(404).send('Task not found');
  task.text = req.body.text ?? task.text;
  task.completed = req.body.completed ?? task.completed;
  await board.save();
  res.json(task);
});

router.delete('/:boardId/tasks/:taskId', auth, async (req, res) => {
  const board = await Board.findOne({ _id: req.params.boardId, user: req.user.id });
  const task = board?.tasks.id(req.params.taskId);
  if (!task) return res.status(404).send('Task not found');
  task.remove();
  await board.save();
  res.send('Task deleted');
});

module.exports = router;
