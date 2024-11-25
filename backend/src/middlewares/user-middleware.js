function validateUserInput(req, res, next) {
    const {firstname, nid_num, username, email, password, dob } = req.body;
    if (!firstname || !username || !nid_num || !email || !gender || !dob||!password) {
        return res.status(400).json({ error: 'Missing required fields: username, email, password, dob' });
    }
    next();
}

function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Access denied' });
    }
}
module.exports = {
    validateUserInput,
    isAdmin

}