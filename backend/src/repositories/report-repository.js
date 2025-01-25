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

    // report-repository.js


    async countAllReports() {
        const query = `SELECT COUNT(*) AS total FROM ${this.model.tableName}`;
        const result = await this.executeRawQuery(query);
        return result[0].total;
    }

    // Count reports by status
    async countByStatus(status) {
        const query = `SELECT COUNT(*) AS total FROM ${this.model.tableName} WHERE status = ?`;
        const result = await this.executeRawQuery(query, [status]);
        return result[0].total;
    }

    // Count reports by category
    async countReportsByCategory() {
        const query = `
            SELECT c.category_name, COUNT(r.category_id) AS total
            FROM ${this.model.tableName} r
            JOIN categories c ON r.category_id = c.category_id
            GROUP BY r.category_id
        `;
        const result = await this.executeRawQuery(query);
        return result;
    }

    async updateById(reportId, updateData) {
        const query = `UPDATE ${this.model.tableName} SET ? WHERE ${this.model.primaryKey} = ?`;
        const result = await this.executeRawQuery(query, [updateData, reportId]);
        return result.affectedRows > 0 ? true : false;
    }

}





module.exports = ReportRepository;
