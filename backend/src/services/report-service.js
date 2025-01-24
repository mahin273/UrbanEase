const ReportRepository = require('../repositories/report-repository');
const CategoryRepository = require('../repositories/category-repository');
const UserRepository = require('../repositories/user-repository')

const reportRepository = new ReportRepository();
const categoryRepository = new CategoryRepository();
const userRepository = new UserRepository();


exports.createReport = async ({ user_id, title, description, category_id, location, google_maps_link, imageUrl }) => {
    console.log("Goooooogle: ",google_maps_link)
    const report = await reportRepository.create({
        user_id,
        title,
        description,
        category_id,
        location,
        google_maps_link,
        image_url: imageUrl,  // Save the image URL in the database
    });

    return report;
};

exports.updateReport = async (reportId, { title, description, category_id, location, google_maps_link, imageUrl }) => {
    const report = await reportRepository.findById(reportId);
    if (!report) throw new Error('Report not found');

    const updatedReport = await reportRepository.updateById(reportId, {
        title,
        description,
        category_id,
        location,
        google_maps_link,
        image_url: imageUrl,  // Update the image URL if changed
    });

    if (!updatedReport) throw new Error('Report could not be updated');

    return updatedReport;
};


exports.getAllReports = async () => {
    const reports = await reportRepository.findAllReportsWithDetails();

    for (const report of reports) {
        // Fetch category name
        const category = await categoryRepository.findCategoryById(report.category_id);
        if (category) {
            report.category_name = category.category_name;  // Ensure correct field name here
        } else {
            report.category_name = 'Unknown Category';  // Fallback if category not found
        }

        // Fetch user details
        const user = await userRepository.findById(report.user_id);
        report.username = user ? user.username : 'Unknown User';
    }

    // Return the updated reports array
    return reports;
};

// Fetch reports by status (new, pending, resolved)
exports.getReportStatsByStatus = async (userId, status) => {
    try {
        let reports;
        let reportCounts = { total: 0, new: 0, pending: 0, resolved: 0 };

        if (status) {
            // Filter reports by status
            if (!['new', 'pending', 'resolved'].includes(status.toLowerCase())) {
                throw new Error('Invalid status filter. Use "new", "pending", or "resolved".');
            }

            reports = await reportRepository.findByUserIdAndStatus(userId, status.toLowerCase());
            reportCounts[status.toLowerCase()] = reports.length;
        } else {
            // Get all reports for the user and count their statuses
            reports = await reportRepository.findByUserId(userId);
            reportCounts.total = reports.length;

            // Count reports by status
            for (const stat of ['new', 'pending', 'resolved']) {
                const statusReports = await reportRepository.findByUserIdAndStatus(userId, stat);
                reportCounts[stat] = statusReports.length;
            }
        }

        return { reports, reportCounts };
    } catch (error) {
        console.error('Error fetching report stats:', error);
        throw error;
    }
};

// Fetch all reports of a user (if no status filter is applied)
exports.getAllReportsByUserId = async (userId) => {
    const reports = await reportRepository.findByUserId(userId);

    for (const report of reports) {
        // Fetch category name
        const category = await categoryRepository.findCategoryById(report.category_id);
        report.category_name = category ? category.category_name : 'Unknown Category';

        // Fetch user details
        const user = await userRepository.findById(report.user_id);
        report.username = user ? user.username : 'Unknown User';
    }

    return reports;
};








exports.getReportById = async (reportId) => {
    const report = await reportRepository.findById(reportId);
    if (!report) throw new Error('Report not found');
    return report;
};

exports.updateReport = async (reportId, { title, description, category_id, location, google_maps_link, imageUrl }) => {
    const report = await reportRepository.findById(reportId);
    if (!report) throw new Error('Report not found');

    const updatedReport = await reportRepository.updateById(reportId, {
        title,
        description,
        category_id,
        location,
        google_maps_link,
        image_url: imageUrl,  // Update the image URL if changed
    });

    if (!updatedReport) throw new Error('Report could not be updated');

    return updatedReport;
};

exports.deleteReportById = async (reportId) => {
    const isDeleted = await reportRepository.deleteById(reportId);
    if (!isDeleted) throw new Error('Report not found or could not be deleted');
    return true;
};
