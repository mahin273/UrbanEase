// src/routes/v1/user-routes.js
const express = require('express');
const userController = require('../../controllers/user-controller');
const userMiddleware = require('../../middlewares/user-middleware');
const upload = require('../../middlewares/multer-config');  // Correct import
const { isAuthenticated } = require('../../middlewares/auth-middleware');

const router = express.Router();

// Remove the redundant storage and upload declaration
// You already imported `upload` from multer-config.js

// Use the multer middleware for handling form data with files
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, username, phone_num, gender, city, postal_code } = req.body;

    console.log('Request Body:', req.body); // Log to check if data is received
    console.log('Uploaded File:', req.file); // Log to check the uploaded file

    try {
        const updatedUser = await userService.updateUser(id, {
            firstname,
            lastname,
            username,
            phone_num,
            gender,
            city,
            postal_code,
            profile_picture: req.file ? req.file.path : null // Only set profile_picture if file is uploaded
        });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(400).json({ error: error.message });
    }
};

// Define user routes
router.post('/register', userMiddleware.validateUserInput, userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/all', userController.getAllUsers);
// Add this route to user-routes.js
router.get('/:id', userController.getUserById);

router.delete('/:id', userMiddleware.isAdmin, userController.deleteUser);

// Forgot password
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

// Route to update profile picture
router.put('/profile-pic', isAuthenticated, upload, userController.updateProfilePic);  // Ensure `upload` is passed here
router.put('/:id', userController.updateUser);

module.exports = router;
