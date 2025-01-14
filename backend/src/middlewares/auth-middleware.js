const { verifyToken } = require('../utils/jwt-utils'); // Import your JWT utility functions

const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized. Token is missing or invalid.' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token

    try {
        const decoded = verifyToken(token); // Verify the token
        req.user = decoded; // Attach user info to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized. Invalid or expired token.' });
    }
};

module.exports = {
    isAuthenticated,
};
