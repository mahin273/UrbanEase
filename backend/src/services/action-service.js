// **File: services/action-service.js**
const ActionRepository = require('../repositories/action-repository');
const actionRepository = new ActionRepository();

// Add a new action
exports.addAction = async (actionData) => {
    const { task_id, staff_id, action_description, status } = actionData;

    if (!task_id || !staff_id || !action_description) {
        throw new Error('Task ID, Staff ID, and Action Description are required');
    }

    return await actionRepository.create({
        task_id,
        staff_id,
        action_description,
        status: status || 'Pending'
    });
};

// Get action history for a specific task
exports.getTaskHistory = async (task_id) => {
    if (!task_id) {
        throw new Error('Task ID is required');
    }

    return await actionRepository.findByTaskId(task_id);
};
