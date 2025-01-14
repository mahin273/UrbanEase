const express = require('express');
const upvoteController = require('../../controllers/upvote-controller');
const { isAuthenticated } = require('../../middlewares/auth-middleware');


const router = express.Router();
router.use(isAuthenticated);

router.post('/', isAuthenticated, upvoteController.upvote);
router.delete('/remove-vote', upvoteController.removeUpvote);

module.exports = router;
