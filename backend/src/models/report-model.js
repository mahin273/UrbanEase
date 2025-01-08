const reportModel = {
    tableName: 'reports',
    primaryKey: 'id',
    columns: {
        id: 'INT AUTO_INCREMENT PRIMARY KEY',
        title: 'VARCHAR(255) NOT NULL',
        description: 'TEXT NOT NULL',
        category_id: 'INT NOT NULL', // Foreign key to categories table
        location: 'VARCHAR(255)',
        google_maps_link: 'VARCHAR(2083)',
        visibility: "ENUM('Public', 'Private') DEFAULT 'Public'",
        status: "ENUM('New', 'In Progress', 'Resolved') DEFAULT 'New'",
        user_id: 'INT NOT NULL',
        created_at: 'DATETIME DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    },
};

module.exports = reportModel;
