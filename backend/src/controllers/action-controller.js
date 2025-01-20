// **File: controllers/action-controller.js**
const actionService = require('../services/action-service');

// Get action history for a specific task
exports.getTaskHistory = async (req, res) => {
    try {
        const { task_id } = req.params; // Extract task_id from request parameters
        if (!task_id) {
            throw new Error('Task ID is required');
        }

        const history = await actionService.getTaskHistory(task_id);
        res.status(200).json(history);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

