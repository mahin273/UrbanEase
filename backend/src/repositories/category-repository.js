const CrudRepository = require('./crud-repository');
const categoryModel = require('../models/category-model');
const pool = require('../config/db'); 


class CategoryRepository extends CrudRepository {
    constructor() {
        super(categoryModel);
    }

    async findById(categoryId) {
        return await this.findOneBy(this.model.primaryKey, categoryId); // Assumes a method to find by primary key
    }
    async findCategoryById(id) {
        const query = `SELECT * FROM categories WHERE category_id = ? LIMIT 1`;  // Adjust if your table name or column is different
        const [rows] = await pool.execute(query, [id]);
        return rows[0] || null;
    }
}

module.exports = CategoryRepository;
