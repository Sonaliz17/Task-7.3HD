import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, Button, TextField, List, ListItem, ListItemText,
  Paper, Box, IconButton, Checkbox
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const API_BASE = 'http://localhost:5000/api';

const App = () => {
  const [boards, setBoards] = useState([]);
  const [token, setToken] = useState('');
  const [boardName, setBoardName] = useState('');
  const [taskText, setTaskText] = useState('');
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const [editingTasks, setEditingTasks] = useState({});
  const [editMode, setEditMode] = useState({});

  const headers = { headers: { Authorization: `Bearer ${token}` } };

  const register = async () => {
    try {
      await axios.post(`${API_BASE}/auth/register`, { email, password });
      alert("Registered. You can now login.");
      setMode("login");
    } catch {
      alert("Registration failed");
    }
  };

  const login = async () => {
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
      setToken(res.data.token);
    } catch {
      alert("Login failed");
    }
  };

  const logout = () => {
    setToken('');
    setBoards([]);
    setTasks([]);
    setSelectedBoard(null);
  };

  const loadBoards = async () => {
    const res = await axios.get(`${API_BASE}/boards`, headers);
    setBoards(res.data);
  };

  const loadTasks = async (boardId) => {
    const res = await axios.get(`${API_BASE}/boards/${boardId}/tasks`, headers);
    setTasks(res.data);
    setSelectedBoard(boardId);
  };

  const addBoard = async () => {
    if (!boardName.trim()) return;
    await axios.post(`${API_BASE}/boards`, { name: boardName }, headers);
    setBoardName('');
    loadBoards();
  };

  const addTask = async () => {
    if (!taskText.trim() || !selectedBoard) return;
    await axios.post(`${API_BASE}/boards/${selectedBoard}/tasks`, { text: taskText }, headers);
    setTaskText('');
    loadTasks(selectedBoard);
  };

  const deleteTask = async (taskId) => {
    await axios.delete(`${API_BASE}/boards/${selectedBoard}/tasks/${taskId}`, headers);
    loadTasks(selectedBoard);
  };

  const toggleTask = async (task) => {
    await axios.put(`${API_BASE}/boards/${selectedBoard}/tasks/${task._id}`, {
      completed: !task.completed
    }, headers);
    loadTasks(selectedBoard);
  };

  const updateTask = async (taskId, newText) => {
    await axios.put(`${API_BASE}/boards/${selectedBoard}/tasks/${taskId}`, {
      text: newText
    }, headers);
    loadTasks(selectedBoard);
  };

  useEffect(() => {
    if (token) loadBoards();
  }, [token]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>Task Board</Typography>

      {!token ? (
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {mode === 'login' ? (
            <>
              <Button variant="contained" onClick={login}>Login</Button>
              <Button onClick={() => setMode('register')}>No account? Register</Button>
            </>
          ) : (
            <>
              <Button variant="contained" onClick={register}>Register</Button>
              <Button onClick={() => setMode('login')}>Already registered? Login</Button>
            </>
          )}
        </Box>
      ) : (
        <>
          <Button variant="outlined" onClick={logout}>Logout</Button>

          <Box display="flex" gap={2} mt={3}>
            <TextField label="New Board" value={boardName} onChange={(e) => setBoardName(e.target.value)} fullWidth />
            <Button variant="contained" onClick={addBoard}>Add</Button>
          </Box>

          <Paper elevation={3} sx={{ mt: 2, p: 2 }}>
            <Typography variant="h6">Your Boards</Typography>
            <List>
              {boards.map((board) => (
                <ListItem
                  button key={board._id}
                  onClick={() => loadTasks(board._id)}
                  selected={selectedBoard === board._id}
                >
                  <ListItemText primary={board.name} />
                </ListItem>
              ))}
            </List>
          </Paper>

          {selectedBoard && (
            <Paper elevation={3} sx={{ mt: 3, p: 2 }}>
              <Typography variant="h6">Tasks</Typography>
              <Box display="flex" gap={2} mt={1}>
                <TextField label="New Task" value={taskText} onChange={(e) => setTaskText(e.target.value)} fullWidth />
                <Button variant="contained" onClick={addTask}>Add</Button>
              </Box>
              <List>
                {tasks.map((task) => (
                  <ListItem key={task._id} secondaryAction={
                    <Box>
                      {editMode[task._id] ? (
                        <Button
                          size="small"
                          onClick={() => {
                            updateTask(task._id, editingTasks[task._id]);
                            setEditMode((prev) => ({ ...prev, [task._id]: false }));
                          }}
                        >
                          Update
                        </Button>
                      ) : (
                        <Button
                          size="small"
                          onClick={() => {
                            setEditMode((prev) => ({ ...prev, [task._id]: true }));
                            setEditingTasks((prev) => ({ ...prev, [task._id]: task.text }));
                          }}
                        >
                          Edit
                        </Button>
                      )}
                      <IconButton onClick={() => deleteTask(task._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }>
                    <Checkbox checked={task.completed} onChange={() => toggleTask(task)} />
                    {editMode[task._id] ? (
                      <TextField
                        value={editingTasks[task._id]}
                        onChange={(e) =>
                          setEditingTasks((prev) => ({ ...prev, [task._id]: e.target.value }))
                        }
                        fullWidth
                      />
                    ) : (
                      <ListItemText primary={task.text} />
                    )}
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </>
      )}
    </Container>
  );
};

export default App;
