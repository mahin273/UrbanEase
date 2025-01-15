const { verifyToken } = require('../utils/jwt-utils');

const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized. Token is missing or invalid.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        req.user = decoded; 
        next(); 
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized. Invalid or expired token.' });
    }
};

module.exports = {
    isAuthenticated,
};
