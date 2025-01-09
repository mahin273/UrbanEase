const ReportRepository = require('../repositories/report-repository');

const reportRepository = new ReportRepository();

exports.createReport = async ({ user_id, title, description, category_id, location, google_maps_link, status, visibility }) => {
    const report = await reportRepository.create({
        user_id,
        title,
        description,
        category_id,
        location,
        google_maps_link,
        status,
        visibility,
    });

    return report;
};


exports.getAllReports = async () => {
    return await reportRepository.findAll();
};

exports.getReportById = async (reportId) => {
    const report = await reportRepository.findById(reportId);
    if (!report) throw new Error('Report not found');
    return report;
};
exports.updateReport = async (reportId, { title, description, category_id, location, google_maps_link, status, visibility }) => {
    const report = await reportRepository.findById(reportId);
    if (!report) throw new Error('Report not found');

    const updatedReport = await reportRepository.updateById(reportId, {
        title,
        description,
        category_id,
        location,
        google_maps_link,
        status,
        visibility,
    });

    if (!updatedReport) throw new Error('Report could not be updated');

    return updatedReport;
};


exports.deleteReportById = async (reportId) => {
    const isDeleted = await reportRepository.deleteById(reportId);
    if (!isDeleted) throw new Error('Report not found or could not be deleted');
    return true;
};
