const express = require('express');
const taskRouter = express.Router();
const { createToDo, getTodos, updateToDo, deleteToDo } = require('../controllers/toDoController');
const authenticateToken = require('../middleware/authjwt');

taskRouter.post('/create-to-do', authenticateToken, createToDo);
taskRouter.get('/get-all-to-do/:userId', authenticateToken, getTodos);
taskRouter.patch('/update-to-do/:id', authenticateToken, updateToDo);
taskRouter.delete('/delete-to-do/:id', authenticateToken, deleteToDo);

module.exports = taskRouter;
