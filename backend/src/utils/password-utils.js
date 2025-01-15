const crypto = require('crypto');

// Utility function to generate a random password
function generateRandomPassword(length = 8) {
    return crypto.randomBytes(length).toString('hex').slice(0, length); // Generate a random password of specified length
}

module.exports = { generateRandomPassword };
