const UserRepository = require('../repositories/user-repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); 
const { sendEmail } = require('../utils/email');

const userRepository = new UserRepository();

exports.registerUser = async ({ firstname, lastname, username, nid_num, email, password }) => {
    // Check for existing user with the same email, username, or NID
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) throw new Error('Email already in use');

    const existingUsername = await userRepository.findByUsername(username);
    if (existingUsername) throw new Error('Username already in use');

    const existingNID = await userRepository.findByNID(nid_num);
    if (existingNID) throw new Error('NID number already in use');

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create the user and return the user ID
    const userId = await userRepository.create({
        firstname,
        lastname,
        username,
        nid_num,
        email,
        password_hash: passwordHash,
    });

    return userId;
};

exports.getAllUsers = async () => {
    return await userRepository.findAll();
};

// Add this method to user-service.js
exports.getUserById = async (id) => {
    const user = await userRepository.findById(id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

exports.updateUser = async (id, updatedData) => {
    try {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
        }

        // Filter out undefined or null values from the updatedData
        const sanitizedData = Object.fromEntries(
            Object.entries(updatedData).filter(([_, v]) => v != null)
        );

        // Update user information with the provided data
        const updatedUser = await userRepository.updateById(id, sanitizedData);

        if (!updatedUser) {
            throw new Error('Failed to update user');
        }

        return updatedUser;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};




exports.deleteUserById = async (id) => {
    const isDeleted = await userRepository.deleteById(id);
    if (!isDeleted) throw new Error('User not found or could not be deleted');
    return true;
};

//login
exports.login = async (email, password) => {
    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    //Generate a JWT token
    const token = jwt.sign(
        {
            id: user.user_id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    
    return { token, user };
};


exports.forgotPassword = async (email) => {
    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new Error('No user found with this email');
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000); // Token expires in 1 hour

    await userRepository.updatePasswordResetToken(email, token, expires);

    const resetLink = `http://127.0.0.1:8080/password-reset.html?${token}`;
    await sendEmail(email, 'Password Reset', `Reset your password here: ${resetLink}`);
};

exports.resetPassword = async (token, newPassword) => {
    const user = await userRepository.findByPasswordResetToken(token);
    if (!user) {
        throw new Error('Invalid or expired token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userRepository.updatePassword(user.user_id, hashedPassword);
};

exports.updateUserProfilePic = async (userId, profilePicUrl) => {
    try {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Update profile picture in the database
        const updatedUser = await userRepository.updateById(userId, { profile_picture: profilePicUrl });

        if (!updatedUser) {
            throw new Error('Failed to update user profile picture');
        }

        return updatedUser;
    } catch (error) {
        console.error('Error updating profile picture:', error);
        throw error;  // Propagate error to the controller
    }
};

