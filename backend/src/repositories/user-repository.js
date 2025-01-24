const CrudRepository = require('./crud-repository');
const userModel = require('../models/user-model');
const db = require('../config/db');

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

 
    async updateById(id, updatedData) {
        const { firstname, lastname, username, phone_num, gender, city, postal_code, profile_picture } = updatedData;

        const query = `
            UPDATE ${userModel.tableName}
            SET firstname = ?, lastname = ?, username = ?, phone_num = ?, gender = ?, city = ?, postal_code = ?, profile_picture = ?
            WHERE user_id = ?
        `;

        const [result] = await db.query(query, [firstname, lastname, username, phone_num, gender, city, postal_code, profile_picture, id]);
        return result.affectedRows > 0 ? await this.findById(id) : null;
    }



    async updatePasswordResetToken(email, token, expires) {
        const query = `
            UPDATE ${userModel.tableName}
            SET password_reset_token = ?, password_reset_expires = ?
            WHERE email = ?
        `;
        const [result] = await db.query(query, [token, expires, email]);
        return result;
    }

    async findByPasswordResetToken(token) {
        const query = `
            SELECT * FROM ${userModel.tableName}
            WHERE password_reset_token = ? AND password_reset_expires > NOW()
        `;
        const [result] = await db.query(query, [token]);
        return result[0];
    }

    async updatePassword(userId, hashedPassword) {
        const query = `
            UPDATE ${userModel.tableName}
            SET password_hash = ?, password_reset_token = NULL, password_reset_expires = NULL
            WHERE user_id = ?
        `;
        await db.query(query, [hashedPassword, userId]);
    }
    findById(id) {
        return this.findOneBy('user_id', id);
    }

}

module.exports = UserRepository;
