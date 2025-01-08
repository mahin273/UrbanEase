function validateReportInput(req, res, next) {
    const { title, description, category_id, visibility, user_id } = req.body;

    const missingFields = [];
    if (!title) missingFields.push('title');
    if (!description) missingFields.push('description');
    if (!category_id) missingFields.push('category_id');
    if (!visibility) missingFields.push('visibility');
    if (!user_id) missingFields.push('user_id');

    if (missingFields.length > 0) {
        return res.status(400).json({
            error: `Missing required fields: ${missingFields.join(', ')}`,
        });
    }

    // Validate visibility options
    if (!['Public', 'Private'].includes(visibility)) {
        return res.status(400).json({ error: 'Invalid visibility option' });
    }

    next();
}

module.exports = { validateReportInput };
