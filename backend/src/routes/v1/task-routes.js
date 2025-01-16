const express = require('express');
const { isAuthenticated } = require('../../middlewares/auth-middleware')
const{isAdmin}=require('../../middlewares/user-middleware')
const taskController = require('../../controllers/task-controller');
const router = express.Router();

// Route for assigning a task (Admin-only)
router.post('/',isAuthenticated, isAdmin, taskController.createTask);

// Route for updating a task (Admin-only)
router.put('/:id', isAuthenticated, isAdmin, taskController.updateTaskStatus);

// Route for deleting a task (Admin-only)
router.delete('/:id',isAuthenticated, isAdmin, taskController.deleteTask);

// Route for getting a single task (Open to all authenticated users)
router.get('/:id', taskController.getTaskById);

// Route for getting all tasks (Open to all authenticated users)
router.get('/', taskController.getAllTasks);

module.exports = router;
