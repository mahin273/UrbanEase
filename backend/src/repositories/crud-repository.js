const pool = require('../config/db'); // MySQL connection pool

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const columns = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map(() => '?').join(', ');
        const values = Object.values(data);

        const query = `INSERT INTO ${this.model.tableName} (${columns}) VALUES (${placeholders})`;
        const [result] = await pool.execute(query, values);
        return result.insertId;
    }

    async findOneBy(column, value) {
        const query = `SELECT * FROM ${this.model.tableName} WHERE ${column} = ? LIMIT 1`;
        const [rows] = await pool.execute(query, [value]);
        return rows[0];
    }

    async findAll() {
        try {
            const query = `SELECT * FROM ${this.model.tableName}`;
            const result = await pool.execute(query);

            // Log the full result to check its structure
            console.log('Query Result:', result);

            // If result is undefined, log an error and return an empty array
            if (!result || !Array.isArray(result[0])) {
                console.error('Error: Query result is not an array:', result);
                return [];  // Return an empty array in case of an error
            }

            const rows = result[0];
            console.log('Rows:', rows); // Log the rows to ensure they are correct
            return rows;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error; // Re-throw the error so it can be handled upstream
        }
    }

  
 

    async updateById(id, data) {
        const updates = Object.keys(data).map((key) => `${key} = ?`).join(', ');
        const values = [...Object.values(data), id];

        const query = `UPDATE ${this.model.tableName} SET ${updates} WHERE ${this.model.primaryKey} = ?`;
        const [result] = await pool.execute(query, values);
        return result.affectedRows > 0;
    }

    async deleteById(id) {
        const query = `DELETE FROM ${this.model.tableName} WHERE ${this.model.primaryKey} = ?`;
        const [result] = await pool.execute(query, [id]);
        return result.affectedRows > 0;
    }
}

module.exports = CrudRepository;
