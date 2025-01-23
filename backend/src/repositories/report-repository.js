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

    async findById(reportId) {
        return await this.findOneBy(this.model.primaryKey, reportId);
    }



    async findByUserIdAndStatus(userId, status) {
        const query = `SELECT * FROM ${this.model.tableName} 
                       WHERE user_id = ? AND status = ?`;
        return await this.executeRawQuery(query, [userId, status]);
    }

    async findByUserId(userId) {
        const query = `SELECT * FROM ${this.model.tableName} 
                       WHERE user_id = ?`;
        return await this.executeRawQuery(query, [userId]);
    }
}



module.exports = ReportRepository;
