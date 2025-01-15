const staffService = require('../services/staff-service'); // Assuming your staff service is located here

// Create a new staff member (Admin-only)
exports.createStaff = async (req, res) => {
    const { first_name, last_name, nid_num, email, role } = req.body;
    try {
        console.log({ first_name, last_name, nid_num, email, role });
        const staff = await staffService.createStaff({ first_name, last_name, nid_num, email, role }); // Pass as an object
        res.status(201).json({ message: 'Staff member created successfully', staff });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Get all staff members (Admin-only)
exports.getAllStaff = async (req, res) => {
    try {
        const staffMembers = await staffService.getAllStaff();
        res.status(200).json(staffMembers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific staff member by ID (Admin-only)
exports.getStaffById = async (req, res) => {
    const { staff_id } = req.params;
    try {
        const staffMember = await staffService.getStaffById(staff_id);
        if (!staffMember) {
            return res.status(404).json({ error: 'Staff member not found' });
        }
        res.status(200).json(staffMember);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a staff member (Admin-only)
exports.updateStaff = async (req, res) => {
    const { staff_id } = req.params; // Get staff_id from params
    const { first_name, last_name, nid_num, email, role } = req.body; // Get other fields from body
    try {
        const updatedStaff = await staffService.updateStaff(staff_id, { // Pass staff_id separately
            first_name,
            last_name,
            nid_num,
            email,
            role,
        });

        if (!updatedStaff) {
            return res.status(404).json({ error: 'Staff member not found' });
        }

        res.status(200).json({ message: 'Staff member updated successfully', updatedStaff });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Delete a staff member (Admin-only)
exports.deleteStaff = async (req, res) => {
    const { staff_id } = req.params;
    try {
        const deletedStaff = await staffService.deleteStaff(staff_id);
        if (!deletedStaff) {
            return res.status(404).json({ error: 'Staff member not found' });
        }
        res.status(200).json({ message: 'Staff member deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
