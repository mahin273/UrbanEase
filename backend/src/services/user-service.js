const UserRepository = require('../repositories/user-repository');
const bcrypt = require('bcrypt');

const userRepository = new UserRepository();

exports.registerUser = async ({ firstname, lastname, username, nid_num, email, password, }) => {
    // Check if the email is already in use
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) throw new Error('Email already in use');
    
    const existingUsername = await userRepository.findByUsername(username);
    if (existingUsername) throw new Error('Username already in use');

    // Check if the nid_num is already in use
    const existingNID = await userRepository.findByNID(nid_num);
    if (existingNID) throw new Error('NID number already in use');
    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create the new user
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
