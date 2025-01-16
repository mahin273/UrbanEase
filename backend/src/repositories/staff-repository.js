const CrudRepository = require('./crud-repository');
const staffModel = require('../models/staff-model');
const db = require('../config/db'); 

class StaffRepository extends CrudRepository {
    constructor() {
        super(staffModel);
    }
    
    async findByNidNum(nid_num) {
        return await this.findOneBy('nid_num', nid_num);
    }

    // Find staff by their role
    async findByRole(role) {
        return await this.findManyBy('role', role);
    }

    // Find staff by email
    async findByEmail(email) {
        const query = `SELECT * FROM staff WHERE email = ?`;
        const [result] = await db.query(query, [email]);
        return result[0];
    }

    // Get all staff members 
    async findAllStaff() {
        const query = `SELECT * FROM ${this.model.tableName}`;
        return await this.executeRawQuery(query);
    }

    // Find staff member by ID
    async findById(staffId) {
        return await this.findOneBy(this.model.primaryKey, staffId);
    }

    async updatePasswordResetToken(email, token, expires) {
        const query = `
            UPDATE ${this.model.tableName}
            SET password_reset_token = ?, password_reset_expires = ?
            WHERE email = ?
        `;
        const [result] = await db.query(query, [token, expires, email]);
        return result;
    }

    async findByPasswordResetToken(token) {
        const query = `
            SELECT * FROM ${this.model.tableName}
            WHERE password_reset_token = ? AND password_reset_expires > NOW()
        `;
        const [result] = await db.query(query, [token]);
        return result[0];
    }

    async updatePassword(staffId, hashedPassword) {
        const query = `
            UPDATE ${this.model.tableName}
            SET password_hash = ?, password_reset_token = NULL, password_reset_expires = NULL
            WHERE staff_id = ?
        `;
        await db.query(query, [hashedPassword, staffId]);
    }


}

module.exports = StaffRepository;
