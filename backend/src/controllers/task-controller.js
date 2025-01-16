const taskService = require('../services/task-service');


// Create a new task
// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { report_id, staff_id, deadline } = req.body;

        // Create an object to pass to the service
        const taskData = {
            report_id,
            staff_id,
            deadline
        };

        const task = await taskService.addTask(taskData);
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get task by ID
exports.getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await taskService.getTaskById(id);
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update task status
exports.updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedTask = await taskService.updateTaskStatus(id, status);
        res.status(200).json({ message: 'Task status updated successfully', updatedTask });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params; // Retrieve the task ID from the request parameters
        const response = await taskService.deleteTaskById(id); // Call the deleteTaskById method
        res.status(200).json(response); // Respond with the success message
    } catch (error) {
        res.status(400).json({ error: error.message }); // Handle errors and respond with the error message
    }
};
