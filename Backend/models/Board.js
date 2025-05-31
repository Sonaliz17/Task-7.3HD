const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  text: String,
  completed: { type: Boolean, default: false },
});

const boardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tasks: [taskSchema],
});

module.exports = mongoose.model('Board', boardSchema);
