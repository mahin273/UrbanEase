const CrudRepository = require('./crud-repository');
const staffModel = require('../models/staff-model');

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
        return await this.findOneBy('email', email);
    }

    // Get all staff members (can be customized further if needed)
    async findAllStaff() {
        const query = `SELECT * FROM ${this.model.tableName}`;
        return await this.executeRawQuery(query);
    }

    // Find staff member by ID
    async findById(staffId) {
        return await this.findOneBy(this.model.primaryKey, staffId);
    }
}

module.exports = StaffRepository;
