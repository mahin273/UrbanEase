const express = require('express');
const userRoutes = require('./v1/user-routes');
const reportRoutes = require('./v1/report-routes')
const upvoteRoutes = require('./v1/upvote-routes')
const commentRoutes = require('./v1/comment-router')


const router = express.Router();

// Use user routes for the '/users' path
router.use('/users', userRoutes);
router.use('/reports', reportRoutes);
router.use('/upvote',upvoteRoutes)
router.use('/reports/:reportId/comments', commentRoutes);
module.exports = router;
