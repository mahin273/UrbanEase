const express = require('express');
const multer = require('multer');
const reportController = require('../../controllers/report-controller');
const reportMiddleware = require('../../middlewares/report-middleware');

const router = express.Router();

// Set up multer storage options
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique file name
    },
});

const upload = multer({ storage: storage });

// Define report routes
router.post('/create', upload.single('file'), reportMiddleware.validateReportInput, reportController.createReport); // Add upload middleware
router.get('/stats', reportController.getReportStats);
router.get('/', reportController.getAllReports);
router.get('/:id', reportController.getReportById);
router.put('/:id', reportController.updateReport);
router.delete('/:id', reportController.deleteReport);
router.get('/user/:userId/stats', reportController.getReportStatsByStatus);
router.post('/assign', reportController.assignWorkToStaff);
module.exports = router;
