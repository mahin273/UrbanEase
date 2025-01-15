const StaffRepository = require('../repositories/staff-repository');

const staffRepository = new StaffRepository();

// Create a new staff member
exports.createStaff = async ({ first_name, last_name, nid_num, email, role }) => {
    const staff = await staffRepository.create({
        first_name,
        last_name,
        nid_num,
        email,
        role,
    });

    return staff;
};


// Get all staff members
exports.getAllStaff = async () => {
    return await staffRepository.findAll();
};

// Get a specific staff member by ID
exports.getStaffById = async (staffId) => {
    const staffMember = await staffRepository.findById(staffId);
    if (!staffMember) throw new Error('Staff member not found');
    return staffMember;
};

// Update a staff member
exports.updateStaff = async (staffId, { first_name, last_name,nid_num, email, role }) => {
    const staffMember = await staffRepository.findById(staffId);
    if (!staffMember) throw new Error('Staff member not found');

    const updatedStaff = await staffRepository.updateById(staffId, {
        first_name,
        last_name,
        nid_num,
        email,
        role,
    });

    if (!updatedStaff) throw new Error('Staff member could not be updated');

    return updatedStaff;
};

// Delete a staff member
exports.deleteStaff = async (staffId) => {
    const isDeleted = await staffRepository.deleteById(staffId);
    if (!isDeleted) throw new Error('Staff member not found or could not be deleted');
    return true;
};
