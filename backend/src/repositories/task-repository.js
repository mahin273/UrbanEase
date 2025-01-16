const CrudRepository = require('./crud-repository');
const taskModel = require('../models/task-model');

class TaskRepository extends CrudRepository {
    constructor() {
        super(taskModel);
    }

    async addTask(taskData) {
        console.log('Task Data:', taskData);
        return await this.create(taskData); // Use the `create` method from CrudRepository
    }

    async findByReportId(report_id) {
        return await this.findManyBy('report_id', report_id);
    }

    async findByStaffId(staffId) {
        return await this.findManyBy('staff_id', staffId);
    }

    async findByStatus(status) {
        return await this.findManyBy('status', status);
    }


    async findById(task_id) {
        return await this.findOneBy(this.model.primaryKey, task_id);
    }

    async findTasksNearDeadline(hours) {
        const query = `
            SELECT * FROM ${this.model.tableName}
            WHERE deadline BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL ? HOUR)
        `;
        return await this.executeRawQuery(query, [hours]);
    }
}

module.exports = TaskRepository;
