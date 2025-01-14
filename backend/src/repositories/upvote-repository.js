const db = require('../config/db'); 

class UpvoteRepository {
    // Upvote a report by a user
    async upvote(reportId, userId) {
        const query = `
            INSERT INTO report_upvotes (report_id, user_id)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE user_id = user_id
        `;
        return await db.query(query, [reportId, userId]);
    }
    // Method to remove a vote from a report
    async removeVote(reportId, userId) {
        const query = `
            DELETE FROM report_upvotes
            WHERE report_id = ? AND user_id = ?
        `;
        return await db.query(query, [reportId, userId]);
    }
   
    async getVoteCount(reportId) {
        const query = `
            SELECT COUNT(*) AS vote_count
            FROM report_upvotes
            WHERE report_id = ?
        `;
        const [result] = await db.query(query, [reportId]);
        return result[0].vote_count;
    }
}

module.exports = UpvoteRepository;
