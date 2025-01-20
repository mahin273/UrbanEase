// src/routes/v1/user-routes.js
const express = require('express');
const userController = require('../../controllers/user-controller');
const userMiddleware = require('../../middlewares/user-middleware');
const upload = require('../../middlewares/multer-config');  // Correct import
const { isAuthenticated } = require('../../middlewares/auth-middleware');

const router = express.Router();

// Define user routes
router.post('/register', userMiddleware.validateUserInput, userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/all', userController.getAllUsers);
router.delete('/:id', userMiddleware.isAdmin, userController.deleteUser);

// Forgot password
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

// Route to update profile picture
router.put('/profile-pic',isAuthenticated, upload, userController.updateProfilePic);  // Ensure `upload` is passed here

module.exports = router;
