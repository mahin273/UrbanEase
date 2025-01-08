const express = require('express');
const userRoutes = require('./v1/user-routes');
const reportRoutes = require('./v1/report-routes')

const router = express.Router();

// Use user routes for the '/users' path
router.use('/users', userRoutes);
router.use('/reports', reportRoutes);

module.exports = router;
