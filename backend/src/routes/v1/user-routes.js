const express = require('express');
const userController = require('../../controllers/user-controller');
const userMiddleware = require('../../middlewares/user-middleware');


const router = express.Router();

// Define user routes
router.post('/register', userMiddleware.validateUserInput, userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/all', userController.getAllUsers);
router.delete('/:id', userMiddleware.isAdmin, userController.deleteUser);

//Forgot password
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

module.exports = router;
