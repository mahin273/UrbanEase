const {addComment,getComments,editComment,deleteComment,} = require('../services/comment-service');

// Add a comment
exports.addComment = async (req, res) => {
    try {
        const { reportId } = req.params;
        const userId = req.user.id; // Get the user ID from the token middleware
        const { commentText } = req.body;

        if (!commentText) {
            return res.status(400).json({ error: 'Comment text is required' });
        }

        const result = await addComment(reportId, userId, commentText);
        res.status(201).json({ message: 'Comment added successfully', commentId: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get comments for a report
exports.getComments = async (req, res) => {
    try {
        const { reportId } = req.params;

        const comments = await getComments(reportId);
        res.status(200).json({ comments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Edit a comment
exports.editComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.id;
        const { commentText } = req.body;

        if (!commentText) {
            return res.status(400).json({ error: 'Comment text is required' });
        }

        const updatedComment = await editComment(commentId, userId, commentText);
        res.status(200).json({
            message: 'Comment updated successfully',
            updatedComment,
        });
    } catch (error) {
        if (error.message === 'Comment not found') {
            res.status(404).json({ error: 'Comment not found' });
        } else if (error.message === 'Unauthorized') {
            res.status(403).json({ error: 'Unauthorized' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.id;

        const result = await deleteComment(commentId, userId);
        if (result) {
            res.status(200).json({ message: 'Comment deleted successfully' });
        } else {
            res.status(404).json({ error: 'Comment not found' });
        }
    } catch (error) {
        if (error.message === 'Unauthorized') {
            res.status(403).json({ error: 'Unauthorized' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};
