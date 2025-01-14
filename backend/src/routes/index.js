const express = require('express');
const userRoutes = require('./v1/user-routes');
const reportRoutes = require('./v1/report-routes')
const upvoteRoutes = require('./v1/upvote-routes')


const router = express.Router();

// Use user routes for the '/users' path
router.use('/users', userRoutes);
router.use('/reports', reportRoutes);
router.use('/upvote',upvoteRoutes)

module.exports = router;
