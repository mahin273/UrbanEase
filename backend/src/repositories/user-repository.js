const CrudRepository = require('./crud-repository');
const userModel = require('../models/user-model');
const db = require('../config/db'); // Import db instance

class UserRepository extends CrudRepository {
    constructor() {
        super(userModel);
    }

    async findByEmail(email) {
        return await this.findOneBy('email', email);
    }

    async findByUsername(username) {
        return await this.findOneBy('username', username);
    }

    async findByNID(nid_num) {
        return await this.findOneBy('nid_num', nid_num);
    }

    async updatePasswordResetToken(email, token, expires) {
        const query = `
            UPDATE ${this.model.tableName}
            SET password_reset_token = ?, password_reset_expires = ?
            WHERE email = ?
        `;
        console.log('Executing query:', query);
        console.log('With parameters:', [token, expires, email]);
        const [result] = await db.query(query, [token, expires, email]); // Use db directly
        return result;
    }

    async findByPasswordResetToken(token) {
        const query = `
            SELECT * FROM ${this.model.tableName}
            WHERE password_reset_token = ? AND password_reset_expires > NOW()
        `;
        const [result] = await db.query(query, [token]); // Use db directly
        return result[0]; // Assuming `result` is an array
    }

    async updatePassword(userId, hashedPassword) {
        const query = `
            UPDATE ${this.model.tableName}
            SET password_hash = ?, password_reset_token = NULL, password_reset_expires = NULL
            WHERE user_id = ?
        `;
        await db.query(query, [hashedPassword, userId]); // Use db directly
    }
}

module.exports = UserRepository;
