const actionModel = {
    tableName: 'actions',
    primaryKey: 'action_id',
    columns: {
        action_id: 'INT AUTO_INCREMENT PRIMARY KEY',
        task_id: 'INT NOT NULL', // Foreign key from the tasks table
        staff_id: 'INT NOT NULL', // Foreign key from the staff table
        action_description: 'TEXT NOT NULL', // Description of the action
        status: "ENUM('Pending', 'In Progress', 'Resolved') DEFAULT 'Pending'", // Action status
        created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    },
    foreignKeys: [
        { column: 'task_id', references: 'tasks(task_id)' },
        { column: 'staff_id', references: 'staff(staff_id)' },
    ],
};

module.exports = actionModel;
