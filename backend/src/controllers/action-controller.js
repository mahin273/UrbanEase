const actionService = require('../services/action-service');

// Create a new action
exports.createAction = async (req, res) => {
    try {
        const { task_id, staff_id, actionDescription, status } = req.body;
        const action = await actionService.addAction(task_id, staff_id, actionDescription, status);
        res.status(201).json({ message: 'Action logged successfully', action });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all actions for a task
exports.getActionsByTask = async (req, res) => {
    try {
        const { task_id } = req.params;
        const actions = await actionService.getActionsByTask(task_id);
        res.status(200).json(actions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all actions by staff
exports.getActionsByStaff = async (req, res) => {
    try {
        const { staff_id } = req.params;
        const actions = await actionService.getActionsByStaff(staff_id);
        res.status(200).json(actions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update action status
exports.updateActionStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedAction = await actionService.updateActionStatus(id, status);
        res.status(200).json({ message: 'Action status updated successfully', updatedAction });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an action
exports.deleteAction = async (req, res) => {
    try {
        const { id } = req.params;
        await actionService.deleteAction(id);
        res.status(200).json({ message: 'Action deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
