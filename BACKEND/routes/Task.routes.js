const express = require('express');
const taskRouter = express.Router();
const authenticateToken = require('../middleware/authjwt');
const {getTask, deleteTask, addTask, editTask } = require('../controllers/taskController');

taskRouter.post('/addTask', authenticateToken, addTask);
taskRouter.get('/getTask/:id', authenticateToken, getTask);
taskRouter.put('/editTask/:id', authenticateToken, editTask);
taskRouter.delete('/deleteTask/:id', authenticateToken, deleteTask);

module.exports = taskRouter;
