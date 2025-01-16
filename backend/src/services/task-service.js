const TaskRepository = require('../repositories/task-repository');
const taskRepository = new TaskRepository();

// Add a task to a report
exports.addTask = async (taskData) => {
    const { report_id, staff_id, deadline } = taskData;
    if (!report_id || !staff_id || !deadline) {
        throw new Error('Report ID, Staff ID, and Deadline are required');
    }

    const task_id = await taskRepository.addTask(taskData);
    return task_id;
};


// Get all tasks assigned to a specific staff
exports.getTasksByStaff = async (staff_id) => {
    if (!staff_id) {
        throw new Error('Staff ID is required');
    }

    const tasks = await taskRepository.findByStaffId(staff_id);
    return tasks;
};

// Get all tasks
exports.getAllTasks = async () => {
    return await taskRepository.findAll(); // Assuming you have a findAll method in your CrudRepository
};

exports.getTaskById = async (task_id) => {
    if (!task_id) {
        throw new Error('Task ID is required');
    }

    const task = await taskRepository.findById(task_id); // Assuming you have a findById method in your repository
    if (!task) {
        throw new Error('Task not found');
    }

    return task;
};

// Get tasks assigned to a specific staff
exports.getTasksByStaff = async (staff_id) => {
    if (!staff_id) {
        throw new Error('Staff ID is required');
    }

    const tasks = await taskRepository.findByStaffId(staff_id);
    return tasks;
};

// Get tasks by their status (e.g., pending, in progress, completed)
exports.getTasksByStatus = async (status) => {
    if (!status) {
        throw new Error('Status is required');
    }

    const tasks = await taskRepository.findByStatus(status);
    return tasks;
};

// Update task status
exports.updateTaskStatus = async (taskId, status) => {
    if (!taskId || !status) {
        throw new Error('Task ID and Status are required');
    }

    const updatedTask = await taskRepository.updateStatus(taskId, status);
    return updatedTask;
};

// Get tasks near deadline (within a specified number of hours)
exports.getTasksNearDeadline = async (hours) => {
    if (!hours) {
        throw new Error('Number of hours is required');
    }

    const tasks = await taskRepository.findTasksNearDeadline(hours);
    return tasks;
};

exports.deleteTaskById = async (task_id) => {
    if (!task_id) {
        throw new Error('Task ID is required');
    }

    // Check if the task exists before attempting to delete
    const task = await taskRepository.findById(task_id);
    if (!task) {
        throw new Error('Task not found');
    }

    // Directly call the inherited deleteById method
    await taskRepository.deleteById(task_id);
    return { message: 'Task deleted successfully' };
};

