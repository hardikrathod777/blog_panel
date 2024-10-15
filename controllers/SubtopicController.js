const SubTopic = require('../models/Subtopic')
const Topic = require('../models/Topic'); 

exports.getAllSubTopic = async (req, res) => {
    try {
        // Fetch user's topics
        const topics = await Topic.find({ user: req.user._id }).lean();
        
        // Fetch all sub-topics and populate the 'Topic' field to get the related topic details
        const subTopics = await SubTopic.find({}).populate('Topic').lean();

        // Check if any sub-topics have missing 'Topic' references
        subTopics.forEach(subTopic => {
            if (!subTopic.Topic) {
                console.warn(`Sub-topic ${subTopic.title} has no associated topic.`);
            }
        });

        console.log('Fetched Topics:', topics); // Log the topics
        console.log('Fetched Sub-Topics:', subTopics); // Log the sub-topics

        // Render the page with topics, sub-topics, and the logged-in user
        res.render('addSubTopics', { topics, subTopics, user: req.user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};


exports.addSubTopic = async (req, res) => {
    try {
        const { title, description, topicId } = req.body;
        
        // Create the sub-topic with a reference to the main topic
        const newSubTopic = new SubTopic({
            title,
            description,
            Topic: topicId,  // Referencing the main topic
        });

        await newSubTopic.save();
        res.redirect('/subTopics');  // Redirect after successful creation
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};

exports.displayTopicsAndSubTopics = async (req, res) => {
    try {
        const topicsWithSubTopics = await Topic.find({ user: req.user._id }).populate('subtopics');
        res.render('topicsWithSubtopics', { topicsWithSubTopics });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};

exports.getAllSubTopics = async (req , res) =>{
    const topics = await Topic.find({ user: req.user._id }).lean();
        
        // Fetch all sub-topics and populate the 'Topic' field to get the related topic details
    const subTopics = await SubTopic.find({}).populate('Topic').lean();

    subTopics.forEach(subTopic => {
        if (!subTopic.Topic) {
            console.warn(`Sub-topic ${subTopic.title} has no associated topic.`);
        }
    });
    res.render('allSubTopics',{ topics, subTopics, user: req.user });
}

exports.deleteSubTopic = async (req, res) => {

}