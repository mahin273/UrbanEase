// **File: repositories/action-repository.js**
const CrudRepository = require('./crud-repository');
const actionModel = require('../models/action-model');

class ActionRepository extends CrudRepository {
    constructor() {
        super(actionModel);
    }

    async findByTaskId(task_id) {
        const query = `SELECT * FROM ${this.model.tableName} WHERE task_id = ? ORDER BY created_at DESC`;
        return await this.executeRawQuery(query, [task_id]);
    }
}

module.exports = ActionRepository;
