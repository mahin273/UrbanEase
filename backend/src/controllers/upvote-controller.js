const { upvoteReport,removeVote } = require('../services/upvote-service');


exports.upvote = async (req, res) => {
    try {
        const { reportId } = req.body;
        const userId = req.user.id;

        // Get the updated vote count after upvoting
        const result = await upvoteReport(reportId, userId);

        res.status(200).json({
            message: 'Report upvoted successfully',
            voteCount: result 
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.removeUpvote = async (req, res) => {
    try {
        const { reportId } = req.body;
        const userId = req.user.id; // Extract user ID from authenticated token

        // Remove the vote and get the updated vote count
        const result = await removeVote(reportId, userId);

        res.status(200).json({
            message: 'Vote removed successfully',
            voteCount: result // Send the updated vote count in the response
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

