const taskModel = {
    tableName: 'tasks',
    primaryKey: 'task_id',
    columns: {
        task_id: 'INT AUTO_INCREMENT PRIMARY KEY',
        report_id: 'INT NOT NULL', // Foreign key from the reports table
        staff_id: 'INT NOT NULL',  // Foreign key from the staff table
        deadline: 'DATETIME NOT NULL', // Task deadline
        status: "ENUM('Pending', 'In Progress', 'Completed', 'Verified') DEFAULT 'Pending'", // Task status
        created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    },
    foreignKeys: [
        { column: 'report_id', references: 'reports(report_id)' },
        { column: 'staff_id', references: 'staff(staff_id)' },
    ],
};

module.exports = taskModel;
