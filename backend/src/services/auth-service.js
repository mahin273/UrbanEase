// services/auth-service.js
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt-utils');
const UserRepository = require('../repositories/user-repository');

const userRepository = new UserRepository();

exports.loginUser = async (email, password) => {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error('Invalid email or password');

    const isPasswordMatch = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordMatch) throw new Error('Invalid email or password');

    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    return { token, user };
};
