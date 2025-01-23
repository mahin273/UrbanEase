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
        console.log('Executing Query:', query);
        console.log('With Values:', values);
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

           
            console.log('Query Result:', result);

            
            if (!result || !Array.isArray(result[0])) {
                console.error('Error: Query result is not an array:', result);
                return [];  
            }

            const rows = result[0];
            console.log('Rows:', rows); 
            return rows;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error; 
        }
    }

  
 
    async findAllReportsWithDetails() {
        try {
            const query = `
            SELECT 
                r.*, 
                u.username, 
                c.category_name  -- Ensure this column exists in your categories table
            FROM ${this.model.tableName} r
            JOIN users u ON r.user_id = u.user_id
            JOIN categories c ON r.category_id = c.category_id
        `;

            const result = await pool.execute(query);

            // Debugging output
            console.log('Query Result:', result);

            if (!result || !Array.isArray(result[0])) {
                console.error('Error: Query result is not an array:', result);
                return [];
            }

            const rows = result[0];
            console.log('Rows:', rows);
            return rows;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
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

    async findById(id) {
        const query = `SELECT * FROM ${this.model.tableName} WHERE ${this.model.primaryKey} = ? LIMIT 1`;
        const [rows] = await pool.execute(query, [id]);
        return rows[0] || null;
    }
}





module.exports = CrudRepository;
