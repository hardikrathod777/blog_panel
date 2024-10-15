const express = require('express');
const router = express.Router();
const SubtopicController = require('../controllers/SubtopicController');
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/addSubTopic', ensureAuthenticated, SubtopicController.getAllSubTopic);
router.post('/add-SubTopic', ensureAuthenticated, SubtopicController.addSubTopic);
router.post('/delete-SubTopic', ensureAuthenticated, SubtopicController.deleteSubTopic);

router.get('/subTopics', ensureAuthenticated, SubtopicController.getAllSubTopics);

module.exports = router;