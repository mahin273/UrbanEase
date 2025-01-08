const CrudRepository = require('./crud-repository');
const reportModel = require('../models/report-model');

class ReportRepository extends CrudRepository {
    constructor() {
        super(reportModel);
    }

    async findByUserId(userId) {
        return await this.findManyBy('user_id', userId);
    }


    async findByCategory(category) {
        return await this.findManyBy('category', category);
    }


    async findPublicReports() {
        const query = `SELECT * FROM ${this.model.tableName} WHERE visibility = 'public'`;
        return await this.executeRawQuery(query);
    }


    async findByStatus(status) {
        return await this.findManyBy('status', status);
    }
}

module.exports = ReportRepository;
