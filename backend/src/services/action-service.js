const ActionRepository = require('../repositories/action-repository');
const actionRepository = new ActionRepository();

// Add an action to a task
exports.addAction = async (taskId, staffId, actionDescription, status) => {
    if (!taskId || !staffId || !actionDescription || !status) {
        throw new Error('Task ID, Staff ID, Action Description, and Status are required');
    }

    const action_id = await actionRepository.addAction(taskId, staffId, actionDescription, status);
    return action_id;
};

// Get all actions for a specific task
exports.getActionsByTask = async (taskId) => {
    if (!taskId) {
        throw new Error('Task ID is required');
    }

    const actions = await actionRepository.findByTaskId(taskId);
    return actions;
};

// Get all actions by a specific staff member
exports.getActionsByStaff = async (staffId) => {
    if (!staffId) {
        throw new Error('Staff ID is required');
    }

    const actions = await actionRepository.findByStaffId(staffId);
    return actions;
};

// Update the status of an action
exports.updateActionStatus = async (action_id, status) => {
    if (!action_id || !status) {
        throw new Error('Action ID and Status are required');
    }

    const updatedAction = await actionRepository.updateStatus(action_id, status);
    return updatedAction;
};
