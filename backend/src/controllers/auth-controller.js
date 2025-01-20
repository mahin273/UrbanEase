// controllers/auth-controller.js
const authService = require('../services/auth-service');

exports.login = async (req, res) => {
    
    try {
        const { email, password } = req.body;
        const { token, user } = await authService.loginUser(email, password);

        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
