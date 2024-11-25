const userModel = {
    tableName: 'users', // Table name in the database
    primaryKey: 'user_id', // Primary key column
    columns: { // Schema definition for reference
        user_id: 'INT AUTO_INCREMENT PRIMARY KEY',
        firstname: 'VARCHAR(255) NOT NULL',
        lastname: 'VARCHAR(255)',
        username: 'VARCHAR(255) NOT NULL',
        nid_num: 'VARCHAR(255) NOT NULL',
        gender: "ENUM('Male', 'Female', 'Others)",
        phone_num:'VARCHAR(255)',
        email: 'VARCHAR(255) UNIQUE NOT NULL',
        password_hash: 'VARCHAR(255) NOT NULL',
        role: "ENUM('resident', 'admin', 'moderator') DEFAULT 'resident'",
        dob: 'DATE',
        city: 'VARCHAR(100)',
        postal_code: 'VARCHAR(20)',
        created_at: 'DATETIME DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    },
};

module.exports = userModel;
