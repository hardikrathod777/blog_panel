const Comment = require('../models/Comment');
const Blog = require('../models/Blog');
const User = require('../models/User');

// Add a new comment
exports.addComment = async (req, res) => {
    try {
        const { comment, blogId } = req.body; // Extract comment and blogId from the request body

        // Create a new comment
        const newComment = new Comment({
            comment, // This should match the property name in the schema
            user: req.user._id, // Reference the logged-in user
            blog: blogId // Reference the blog post
        });

        await newComment.save();

        // Redirect to the blog page or send a success response
        res.redirect(`/blogs`); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Fetch all comments for a specific blog
exports.getComments = async (req, res) => {
    try {
        const { blogId } = req.params;
        const comments = await Comment.find({ blog: blogId }).populate('user', 'username'); // Populate the username

        res.json(comments); // Send comments as JSON response
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

