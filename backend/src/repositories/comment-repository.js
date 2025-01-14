const db = require('../config/db'); // Adjust to your database configuration

class CommentRepository {
    // Add a comment to the database
    async addComment(reportId, userId, commentText) {
        const query = `INSERT INTO report_comments (report_id, user_id, comment_text) VALUES (?, ?, ?)`;
        const [result] = await db.query(query, [reportId, userId, commentText]);
        return result.insertId;
    }

    // Get all comments for a specific report
    async getComments(reportId) {
        const query = `SELECT * FROM report_comments WHERE report_id = ? ORDER BY created_at DESC`;
        const [comments] = await db.query(query, [reportId]);
        return comments;
    }

    // Get a specific comment by ID
    async getCommentById(commentId) {
        const query = `SELECT * FROM report_comments WHERE id = ?`;
        const [result] = await db.query(query, [commentId]);
        return result[0]; // Return the first result or undefined
    }

    // Update a comment
    async updateComment(commentId, commentText) {
        const query = `UPDATE report_comments SET comment_text = ? WHERE id = ?`;
        await db.query(query, [commentText, commentId]);
        return this.getCommentById(commentId);
    }

    // Delete a comment
    async deleteComment(commentId) {
        const query = `DELETE FROM report_comments WHERE id = ?`;
        const [result] = await db.query(query, [commentId]);
        return result.affectedRows > 0; // Return true if a row was deleted
    }
}

module.exports = CommentRepository;
