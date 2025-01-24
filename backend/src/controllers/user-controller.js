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
// Add this method to user-controller.js
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    console.log('Request Params:', req.params);  // Check the extracted user_id
    console.log('Form Data:', req.body);         // Check the form data
    console.log('Uploaded File:', req.file);     // Check the uploaded file

    try {
        const { id } = req.params;  // Extract user_id from the URL params

        if (!id) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const { firstname, lastname, phone_num, gender, city, postal_code, dob } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
        console.log('Image URL:', imageUrl);

        const sanitizedData = {
            firstname: firstname || undefined,  // Use undefined instead of null to exclude the field
            lastname: lastname || undefined,
            phone_num: phone_num || undefined,
            gender: gender || undefined,
            city: city || undefined,
            postal_code: postal_code || undefined,
            dob: dob || undefined,
            profile_picture: imageUrl || undefined
        };


        console.log('Sanitized data: ', sanitizedData);

        // Use the extracted `id` to find the user
        const user = await userService.getUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const update = await userService.updateUser(id, sanitizedData);

        res.status(200).json({ message: 'User updated successfully', update });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(400).json({ error: error.message });
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






