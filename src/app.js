const express = require('express');
const tasksRouter = require('./routes/tasks');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'CSC 436 Project 4 API',
    endpoints: {
      tasks: '/api/tasks'
    }
  });
});

app.use('/api/tasks', tasksRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

