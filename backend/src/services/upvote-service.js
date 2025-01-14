const UpvoteRepository = require('../repositories/upvote-repository');


const upvoteRepository = new UpvoteRepository();

exports.upvoteReport = async (reportId, userId) => {
    // Validate report ID and user ID
    if (!reportId || !userId) {
        throw new Error('Report ID and User ID are required');
    }


    // Handle upvote logic
    await upvoteRepository.upvote(reportId, userId);

    // Get the updated vote count
    const voteCount = await upvoteRepository.getVoteCount(reportId);

    return voteCount;
};
exports.removeVote = async (reportId, userId) => {
    // Validate report ID and user ID
    if (!reportId || !userId) {
        throw new Error('Report ID and User ID are required');
    }

    // Remove the vote
    await upvoteRepository.removeVote(reportId, userId);

    // Get the updated vote count after removing the vote
    const voteCount = await upvoteRepository.getVoteCount(reportId);

    return voteCount;
};

