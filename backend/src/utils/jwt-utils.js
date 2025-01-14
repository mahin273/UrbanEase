// utils/jwt-utils.js
const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET;

// Generate a JWT
const generateToken = (payload, expiresIn = '1h') => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

// Verify a JWT
const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
