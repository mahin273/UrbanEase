const categoryModel = {
    tableName: 'categories',
    primaryKey: 'category_id',
    columns: {
        category_id: 'INT AUTO_INCREMENT PRIMARY KEY',
        category_name: 'VARCHAR(255) DEFAULT NULL', // Category name
        created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    },
};

module.exports = categoryModel;
