const Topic = require('../models/Topic');

// Get all topics and render them
exports.getAllTopics = async (req, res) => {
    try {
        const topics = await Topic.find().populate('user');  // Populate the user data for each topic
        res.render('addTopics', { topics, user: req.user });  // Pass topics and the current user to the view
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.addTopic = async (req, res) => {
    const { title, description } = req.body;

    try {
        if (!req.user) {
            return res.status(401).send('User not authenticated');
        }

        const newTopic = new Topic({
            title,
            description,
            user: req.user._id  // Ensure req.user is populated by Passport or another authentication method
        });

        await newTopic.save();
        res.redirect('/addTopics');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
exports.deleteTopic = async (req, res) => {
    try {
        const topicId = req.params.id;
        
        // Find the topic by ID
        const topic = await Topic.findById(topicId);

        if (!topic) {
            return res.status(404).send('Topic not found');
        }

        // Check if the logged-in user is the owner of the topic
        if (topic.user.toString() !== req.user._id.toString()) {
            return res.status(403).send('You are not authorized to delete this topic');
        }

        // Delete the topic
        await Topic.findByIdAndDelete(topicId);

        res.redirect('/addTopics');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};