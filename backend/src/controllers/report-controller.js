const reportService = require('../services/report-service');

exports.createReport = async (req, res) => {
    try {
        const report = await reportService.createReport(req.body);
        res.status(201).json({ message: 'Report created successfully', report });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllReports = async (req, res) => {
    try {
        const reports = await reportService.getAllReports();
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
