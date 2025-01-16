const express = require('express');
const staffController = require('../../controllers/staff-controller');
const { isAdmin } = require('../../middlewares/user-middleware');  // Ensure admin access
const {isAuthenticated} = require('../../middlewares/auth-middleware')

const router = express.Router();

// Route to create a new staff member (Admin-only)
router.post('/create',isAuthenticated, isAdmin, staffController.createStaff);

// Route to get all staff members (Admin-only)
router.get('/', isAuthenticated, isAdmin, staffController.getAllStaff);

// Route to get a specific staff member by ID (Admin-only)
router.get('/:staff_id', isAuthenticated, isAdmin, staffController.getStaffById);

// Route to update a staff member (Admin-only)
router.put('/:staff_id', isAuthenticated,isAdmin, staffController.updateStaff);

// Route to delete a staff member (Admin-only)
router.delete('/:staff_id', isAuthenticated, isAdmin, staffController.deleteStaff);

//router to login staff
router.post('/login', staffController.loginStaff);

module.exports = router;
