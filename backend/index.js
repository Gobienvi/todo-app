//imports

import express from 'express';
import cors from 'cors';

const port = 3000;
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//temp. Data
let tasks = [
  {
    id: 1,
    completed: false,
    title: 'argue with the alarm clock',
    description: 'hit snooze at least 5 times and still be late',
    dueDate: '03/01/2024',
    dateCreated: new Date(Date.now()).toLocaleDateString(),
  },
  {
    id: 2,
    completed: true,
    title: 'pretend to be productive',
    description: 'open laptop and stare at screen dramatically',
    dueDate: '07/01/2024',
    dateCreated: new Date(Date.now()).toLocaleDateString(),
  },
  {
    id: 3,
    completed: false,
    title: 'look for lost sock',
    description: 'accept that it no longer exists',
    dueDate: '06/01/2024',
    dateCreated: new Date(Date.now()).toLocaleDateString(),
  },
  {
    id: 4,
    completed: true,
    title: 'reward myself',
    description: 'drink beer because life is hard',
    dueDate: '04/01/2024',
    dateCreated: new Date(Date.now()).toLocaleDateString(),
  },
];

//routes
app.get('/', (req, res) => {
  res.send('Hello from To Do App Backend!');
});

app.get('/tasks', (req, res) => {
  console.log('GET /tasks called');
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  console.log('POST /tasks - create new tasks called');
  console.log('Request Body:', req.body);

  // Get tasl data from request body
  const { title, description, dueDate } = req.body;

  //validation could be added here

  if (!title) {
    return res.status(400).json({ error: 'Title is required !' });
  }

  const newTask = {
    id: generateId(),
    title: title,
    description: description || '',
    dueDate: dueDate || '',
    dateCreated: new Date(Date.now()).toLocaleDateString(),
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT - Update task with 201 status

app.put('/tasks/:id/complete', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Task not found !' });
  }
  task.completed = true;
  console.log('Task Completed status updated:', task);
  res.json(task);
});

// PATCH - Update task with 201 status

app.patch('/tasks/:id/incomplete', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Task not found !' });
  }

  task.completed = false;
  console.log('Task Completed status updated:', task);
  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found !' });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];

  console.log('task deleted:', deletedTask);
  res.json({ message: 'Task deleted successfully !', task: deletedTask });
});

const generateId = () => {
  if (tasks.length === 0) return 1;
  const maxId = Math.max(...tasks.map((task) => task.id));
  return maxId + 1;
};
// HTTP Methods

//GET - Retrieve data

//POST - Create data

//PUT - Update data

//PATCH - Modify data

//DELETE - Delete data

//App Startup
app.listen(port, () => {
  console.log(`Backend Server for To Do App listening  on port ${port}`);
});
