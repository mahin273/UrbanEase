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
