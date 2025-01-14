const UserRepository = require('../repositories/user-repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
