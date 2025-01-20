const userService = require('../services/user-service');

exports.registerUser = async (req, res) => {
    try {
        const userId = await userService.registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await userService.deleteUserById(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//login method
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await userService.login(email, password);
        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Forgot password controller
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        await userService.forgotPassword(email); // Use userService here
        res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        await userService.resetPassword(token, newPassword);
        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// controllers/user-controller.js
exports.updateProfilePic = async (req, res) => {
    console.log('Request Body:', req.body);
    console.log('Request File:', req.file);
    console.log('Request User:', req.user);

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    const userId = req.user.id;
    const profilePicPath = req.file.path.replace(/\\/g, '/');  // Fix for Windows paths

    try {
        const updatedUser = await userService.updateUserProfilePic(userId, profilePicPath);

        if (!updatedUser) {
            return res.status(500).json({ error: 'Error updating profile picture.' });
        }

        res.status(200).json({ message: 'Profile picture updated successfully.' });
    } catch (err) {
        console.error('Profile update error:', err);
        res.status(500).json({ error: 'Error updating profile picture.', details: err.message });
    }
};




