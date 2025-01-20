function validateReportInput(req, res, next) {
    console.log('Request Body:', req.body);  // Log to see if the form data is there

    const { title, description, category_id, visibility,status, user_id } = req.body;

    const missingFields = [];
    if (!title) missingFields.push('title');
    if (!description) missingFields.push('description');
    if (!category_id) missingFields.push('category_id');
    if (!visibility) missingFields.push('visibility');
    if (!status) missingFields.push('status');
    if (!user_id) missingFields.push('user_id');

    if (missingFields.length > 0) {
        return res.status(400).json({
            error: `Missing required fields: ${missingFields.join(', ')}`,
        });
    }

    next();
}


function isAdmin(req, res, next) {
    const { user } = req;
    if (user && user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ error: 'Unauthorized: Admin access required' });
}

module.exports = { validateReportInput, isAdmin };
