const CrudRepository = require('./crud-repository');
const actionModel = require('../models/action-model');

class ActionRepository extends CrudRepository {
    constructor() {
        super(actionModel);
    }

    async findByTaskId(task_id) {
        return await this.findManyBy('task_id', task_id);
    }

    async findByStaffId(staff_id) {
        return await this.findManyBy('staff_id', staff_id);
    }

    async findByStatus(status) {
        return await this.findManyBy('status', status);
    }

    async findById(action_id) {
        return await this.findOneBy(this.model.primaryKey, action_id);
    }
}

module.exports = ActionRepository;
