const express = require('express');
const userRoutes = require('./v1/user-routes')

const router = express.Router();

// Use user routes for the '/users' path
router.use('/users', userRoutes);
module.exports = router;
