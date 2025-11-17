const { randomUUID } = require('crypto');

const tasks = [
  {
    id: randomUUID(),
    title: 'Write project outline',
    description: 'Draft the scope and milestones for Project 4.',
    status: 'in-progress',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: randomUUID(),
    title: 'Record Postman demo',
    description: 'Capture screenshots or video for the README walkthrough.',
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const getAllTasks = () => tasks;

const findTaskById = (id) => tasks.find((task) => task.id === id);

const createTask = ({ title, description, status }) => {
  const timestamp = new Date().toISOString();
  const newTask = {
    id: randomUUID(),
    title,
    description,
    status: status || 'pending',
    createdAt: timestamp,
    updatedAt: timestamp
  };

  tasks.push(newTask);
  return newTask;
};

const updateTask = (id, updates) => {
  const task = findTaskById(id);
  if (!task) {
    return null;
  }

  if (updates.title !== undefined) {
    task.title = updates.title;
  }
  if (updates.description !== undefined) {
    task.description = updates.description;
  }
  if (updates.status !== undefined) {
    task.status = updates.status;
  }

  task.updatedAt = new Date().toISOString();
  return task;
};

const deleteTask = (id) => {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    return null;
  }

  const [removedTask] = tasks.splice(index, 1);
  return removedTask;
};

module.exports = {
  getAllTasks,
  findTaskById,
  createTask,
  updateTask,
  deleteTask
};

