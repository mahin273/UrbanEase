const express = require('express');
const userController = require('../../controllers/user-controller');
const userMiddleware = require('../../middlewares/user-middleware');

const router = express.Router();

// Define user routes
router.post('/register', userMiddleware.validateUserInput, userController.registerUser);
router.get('/all', userController.getAllUsers);
router.delete('/:id', userMiddleware.isAdmin, userController.deleteUser);

module.exports = router;
