const {
  getAllTasks,
  findTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('../data/tasksStore');
const { validateTaskPayload } = require('../utils/validateTask');

const handleServerError = (res, error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  return res.status(500).json({ error: 'An unexpected error occurred.' });
};

const getTasks = (req, res) => {
  try {
    const tasks = getAllTasks();
    return res.status(200).json({
      data: tasks,
      count: tasks.length
    });
  } catch (error) {
    return handleServerError(res, error);
  }
};

const getTaskById = (req, res) => {
  try {
    const task = findTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: `Task with id ${req.params.id} not found.` });
    }

    return res.status(200).json(task);
  } catch (error) {
    return handleServerError(res, error);
  }
};

const createTaskHandler = (req, res) => {
  try {
    const { valid, errors, sanitized } = validateTaskPayload(req.body, { requireAllFields: true });
    if (!valid) {
      return res.status(400).json({ errors });
    }

    const newTask = createTask(sanitized);
    return res.status(201).json(newTask);
  } catch (error) {
    return handleServerError(res, error);
  }
};

const updateTaskHandler = (req, res) => {
  try {
    const { valid, errors, sanitized } = validateTaskPayload(req.body, { allowPartial: true });
    if (!valid) {
      return res.status(400).json({ errors });
    }

    const updatedTask = updateTask(req.params.id, sanitized);
    if (!updatedTask) {
      return res.status(404).json({ error: `Task with id ${req.params.id} not found.` });
    }

    return res.status(200).json(updatedTask);
  } catch (error) {
    return handleServerError(res, error);
  }
};

const deleteTaskHandler = (req, res) => {
  try {
    const deletedTask = deleteTask(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: `Task with id ${req.params.id} not found.` });
    }

    return res.status(200).json({
      message: 'Task deleted successfully.',
      task: deletedTask
    });
  } catch (error) {
    return handleServerError(res, error);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask: createTaskHandler,
  updateTask: updateTaskHandler,
  deleteTask: deleteTaskHandler
};

