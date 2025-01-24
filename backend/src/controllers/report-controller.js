const reportService = require('../services/report-service');

exports.createReport = async (req, res) => {
    console.log('Form Data:', req.body);  // Log body data
    console.log('Uploaded File:', req.file);
    try {
        const { user_id, title, description, category_id, location, google_maps_link, visibility } = req.body;
        
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  // Get image URL if uploaded

        const report = await reportService.createReport({
            user_id,
            title,
            description,
            category_id,
            location,
            google_maps_link,
            visibility,
        
            imageUrl,  // Add imageUrl to the report data
        });

        res.status(201).json({ message: 'Report created successfully', report });
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

exports.updateReport = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedReport = await reportService.updateReport(id, req.body);
        res.status(200).json({ message: 'Report updated successfully', updatedReport });
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



