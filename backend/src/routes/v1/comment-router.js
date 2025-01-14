const express = require('express');
const { isAuthenticated } = require('../../middlewares/auth-middleware');
const commentController = require('../../controllers/comment-controller');

const router = express.Router({ mergeParams: true }); // Enable access to :reportId from parent

// Add a comment to a report
router.post('/', isAuthenticated, commentController.addComment);

// Get all comments for a specific report
router.get('/', commentController.getComments);

// Edit a comment
router.put('/:commentId', isAuthenticated, commentController.editComment);

// Delete a comment
router.delete('/:commentId', isAuthenticated, commentController.deleteComment);

module.exports = router;
