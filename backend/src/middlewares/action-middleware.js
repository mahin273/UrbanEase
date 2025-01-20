// **File: middlewares/action-middleware.js**
const actionService = require('../services/action-service');

// Middleware to log task actions automatically
exports.logTaskAction = async (task_id, staff_id, action_description, status) => {
    try {
        await actionService.addAction({
            task_id,
            staff_id,
            action_description,
            status
        });
    } catch (error) {
        console.error('Failed to log task action:', error.message);
    }
};