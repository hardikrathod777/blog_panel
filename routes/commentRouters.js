const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { ensureAuthenticated } = require('../middleware/auth');

// Add a comment to a blog post
router.post('/add-comment', ensureAuthenticated, commentController.addComment);

// Fetch comments for a specific blog post
router.get('/comments/:blogId', commentController.getComments);

module.exports = router;
