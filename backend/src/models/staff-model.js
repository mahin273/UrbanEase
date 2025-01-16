const staffModel = {
    tableName: 'staff',
    primaryKey: 'staff_id',
    columns: {
        staff_id: 'INT AUTO_INCREMENT PRIMARY KEY',
        first_name: 'VARCHAR(100) NOT NULL',
        last_name: 'VARCHAR(100)',
        email: 'VARCHAR(255) UNIQUE NOT NULL',
        nid_num: 'VARCHAR(255) NOT NULL',
        role: "ENUM('field staff') NOT NULL", 
        password: "VARCHAR(255) NOT NULL",
        password_reset_token: 'VARCHAR(255)', // Token for password reset
        password_reset_expires: 'DATETIME', // Expiration for the token
        created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    },
};

module.exports = staffModel;
