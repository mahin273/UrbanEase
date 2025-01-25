const CategoryRepository = require('../repositories/category-repository');  // Import the category repository
const reportService = require('../services/report-service');

const categoryRepository = new CategoryRepository();// Check the available methods

exports.createReport = async (req, res) => {
    console.log('Form Data:', req.body);  // Log body data
    console.log('Uploaded File:', req.file);

    try {
        const { user_id, title, description, category, location, google_maps } = req.body;
        console.log('Request Body:', req.body); 
        // Fetch category ID based on the category name
        const categoryRecord = await categoryRepository.findCategoryByName(category);

        if (!categoryRecord) {
            return res.status(400).json({ error: 'Category not found' });
        }

        const category_id = categoryRecord.category_id;  // Use the category ID fetched from the database

        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;  // Get image URL if uploaded

        const report = await reportService.createReport({
            user_id,
            title,
            description,
            category_id,  // Use category ID
            location,
            google_maps_link:google_maps,
            imageUrl,
        });
        

        res.status(201).json({ message: 'Report created successfully', report });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// report-controller.js

exports.getReportStats = async (req, res) => {
    try {
        const stats = await reportService.getReportStatistics();
        res.status(200).json({
            totalReports: stats.totalReports,
            newReports: stats.newReports,
            pendingReports: stats.pendingReports,
            resolvedReports: stats.resolvedReports,
            categoryReports: stats.categoryReports
        });
    } catch (error) {
        console.error('Error fetching report stats:', error);
        res.status(500).json({ error: error.message });
    }
};


exports.updateReport = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedReport = await reportService.updateReport(id, req.body);
        res.status(200).json({ message: 'Report updated successfully', updatedReport });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getAllReports = async (req, res) => {
    try {
        const reports = await reportService.getAllReports();
        console.log('Reports to send:', reports);  // Log the reports before sending
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.getReportById = async (req, res) => {
    try {
        const { id } = req.params;
        const report = await reportService.getReportById(id);
        res.status(200).json(report);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



exports.deleteReport = async (req, res) => {
    try {
        const { id } = req.params;
        await reportService.deleteReportById(id);
        res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getReportStatsByStatus = async (req, res) => {
    try {
        const { stats } = req.query;  // Get the 'stats' query parameter from the URL
        const userId = req.params.userId;  // Get the userId from the URL path

        const { reports, reportCounts } = await reportService.getReportStatsByStatus(userId, stats);

        res.status(200).json({
            reports,
            stats: reportCounts  // Include the stats in the response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


exports.assignWorkToStaff = async (req, res) => {
    try {
        const { reportId, staffId } = req.body;

        // Validate input
        if (!reportId || !staffId) {
            return res.status(400).json({ error: 'Report ID and Staff ID are required' });
        }

        // Call the service to assign the task
        const result = await reportService.assignWorkToStaff(reportId, staffId);

        res.status(200).json({ message: 'Work assigned successfully', result });
    } catch (error) {
        console.error('Error assigning work:', error);
        res.status(500).json({ error: error.message });
    }
};


