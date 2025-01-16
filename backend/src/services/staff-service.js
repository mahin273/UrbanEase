const StaffRepository = require('../repositories/staff-repository');
const bcrypt = require('bcrypt');
const { sendPasswordToStaff } = require('../utils/email-utils'); // assuming the email function is here
const { generateRandomPassword } = require('../utils/password-utils'); // assuming this is where your password generation logic is
const { sendEmail } = require('../utils/email');
const crypto = require('crypto');

const staffRepository = new StaffRepository();

// Create a new staff member
exports.createStaff = async ({ first_name, last_name, nid_num, email, role }) => {
    // Generate a random password
    const randomPassword = generateRandomPassword();

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(randomPassword, 10); // 10 is the salt rounds

    // Create the staff member with hashed password
    const staff = await staffRepository.create({
        first_name,
        last_name,
        nid_num,
        email,
        role,
        password: hashedPassword,  // storing hashed password
    });

    // Send the generated password to the staff member's email
    await sendPasswordToStaff(email, randomPassword);

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

exports.getStaffByEmail = async (email) => {
    const staff = await staffRepository.findByEmail(email);
    if (!staff) throw new Error('Staff not found');
    return staff;
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

exports.loginStaff = async (email, password) => {
    try {
        // Fetch the staff member by email
        const staff = await staffRepository.findByEmail(email);

        if (!staff) {
            throw new Error("Staff not found");
        }

        // Ensure the password is compared correctly
        const isMatch = await bcrypt.compare(password, staff.password);

        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        // If password matches, return the staff member's details (or generate a JWT)
        return staff;

    } catch (error) {
        throw new Error(error.message);
    }
};

exports.forgotPassword = async (email) => {
    const staff = await staffRepository.findByEmail(email);
    if (!staff) {
        throw new Error('No staff found with this email');
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000); // Token expires in 1 hour

    await staffRepository.updatePasswordResetToken(email, token, expires);

    const resetLink = `http://here_is_frontend.com/reset-password/${token}`;
    await sendEmail(email, 'Password Reset', `Reset your password here: ${resetLink}`);
};

exports.resetPassword = async (token, newPassword) => {
    const staff = await staffRepository.findByPasswordResetToken(token);
    if (!staff) {
        throw new Error('Invalid or expired token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await staffRepository.updatePassword(staff.staff_id, hashedPassword);
};

