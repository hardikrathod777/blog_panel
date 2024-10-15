const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/addTopics', ensureAuthenticated, topicController.getAllTopics);
router.post('/add-Topics', ensureAuthenticated, topicController.addTopic);
router.post('/delete-topic/:id', ensureAuthenticated, topicController.deleteTopic);

module.exports = router; 