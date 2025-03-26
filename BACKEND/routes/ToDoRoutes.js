const express = require('express');
const router = express.Router();
const { createToDo, getTodos, updateToDo, deleteToDo } = require('../controllers/toDoController');
const authenticateToken = require('../middleware/authjwt');

router.post('/create-to-do', authenticateToken, createToDo);
router.get('/get-all-to-do/:userId', authenticateToken, getTodos);
router.patch('/update-to-do/:id', authenticateToken, updateToDo);
router.delete('/delete-to-do/:id', authenticateToken, deleteToDo);

module.exports = router;
