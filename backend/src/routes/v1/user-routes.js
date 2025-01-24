const express = require('express');
const userController = require('../../controllers/user-controller');
const userMiddleware = require('../../middlewares/user-middleware');
const multer = require('multer');  // Reuse multer config
const { isAuthenticated } = require('../../middlewares/auth-middleware');


const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });
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
// Route to update profile pict

 // Ensure `upload` is passed here
router.patch('/:id', upload.single('profile_picture'), isAuthenticated,  userController.updateUser);



module.exports = router;
