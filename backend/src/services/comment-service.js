const CommentRepository = require('../repositories/comment-repository');
const commentRepository = new CommentRepository();

// Add a comment to a report
exports.addComment = async (reportId, userId, commentText) => {
    if (!reportId || !userId || !commentText) {
        throw new Error('Report ID, User ID, and Comment Text are required');
    }

    const commentId = await commentRepository.addComment(reportId, userId, commentText);
    return commentId;
};

// Get all comments for a specific report
exports.getComments = async (reportId) => {
    if (!reportId) {
        throw new Error('Report ID is required');
    }

    const comments = await commentRepository.getComments(reportId);
    return comments;
};

// Edit an existing comment
exports.editComment = async (commentId, userId, commentText) => {
    if (!commentId || !userId || !commentText) {
        throw new Error('Comment ID, User ID, and Comment Text are required');
    }

    const comment = await commentRepository.getCommentById(commentId);
    if (!comment) {
        throw new Error('Comment not found');
    }
    if (comment.user_id !== userId) {
        throw new Error('Unauthorized');
    }

    const updatedComment = await commentRepository.updateComment(commentId, commentText);
    return updatedComment;
};

// Delete a comment
exports.deleteComment = async (commentId, userId) => {
    if (!commentId || !userId) {
        throw new Error('Comment ID and User ID are required');
    }

    const comment = await commentRepository.getCommentById(commentId);
    if (!comment) {
        throw new Error('Comment not found');
    }
    if (comment.user_id !== userId) {
        throw new Error('Unauthorized');
    }

    const result = await commentRepository.deleteComment(commentId);
    return result;
};
