const express = require('express');
const reportController = require('../../controllers/report-controller');
const reportMiddleware = require('../../middlewares/report-middleware');

const router = express.Router();

// Define report routes
router.post('/create', reportMiddleware.validateReportInput, reportController.createReport);
router.get('/', reportController.getAllReports);
router.get('/:id', reportController.getReportById);
// router.put('/:id', reportMiddleware.isAdmin, reportController.updateReport);
// router.delete('/:id', reportMiddleware.isAdmin, reportController.deleteReport);

module.exports = router;
