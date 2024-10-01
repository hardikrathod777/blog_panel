const Blog = require('../models/Blog');
const multer = require('multer');
const upload = require('../config/multer');
const bcrypt = require('bcrypt');
const User = require('../models/User')

// Blog logic for Add, Edit, Delete
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username'); // Populate the author field if you're storing user references
        res.render('allBlogs', { blogs });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching blogs');
    }
};

exports.getMyBlogs = async (req, res) => {
    const blogs = await Blog.find({ author: req.user._id });
    res.render('myBlogs', { blogs, user: req.user }); // Pass the user object
};

exports.changePass = async (req , res) => {
    res.render('changePass');
}
exports.updatepass = async (req, res) => {
    const { cur_pass, new_pass, conf_pass } = req.body;

    // Check if the new password matches the confirm password
    if (new_pass !== conf_pass) {
        return res.render('changePass', { errors: [{ msg: 'New passwords do not match' }] });
    }

    try {
        // Find the user by ID (assuming `req.user` contains the logged-in user's data)
        const user = await User.findById(req.user._id);

        // Check if the current password is correct
        const isMatch = await bcrypt.compare(cur_pass, user.password);
        if (!isMatch) {
            return res.render('changePass', { errors: [{ msg: 'Current password is incorrect' }] });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(new_pass, 10);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.redirect('/my-blogs'); // Redirect to a relevant page (e.g., profile page)
    } catch (error) {
        console.error(error);
        res.render('changePass', { errors: [{ msg: 'Error updating password' }] });
    }
}

exports.addBlogPost = async (req, res) => {
    const { title, description } = req.body;
    const image = req.file.filename; // Access the uploaded image

    const newBlog = new Blog({
        title,
        description,
        image,
        author: req.user._id // Set the author to the logged-in user's ID
    });

    try {
        await newBlog.save();
        res.redirect('/my-blogs');
    } catch (error) {
        console.error(error);
        res.render('addBlog', { errors: [{ msg: 'Failed to add blog' }] });
    }
};



exports.getEditBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        
        // Ensure the logged-in user is the author
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.redirect('/my-blogs');
        }

        res.render('editBlog', { blog });
    } catch (error) {
        console.error(error);
        res.redirect('/my-blogs');
    }
};

exports.postEditBlog = async (req, res) => {
    const { title, description } = req.body;
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId); // Fetch the existing blog first

    try {
        const updatedFields = { title, description };
        // Only update the image if a new one is provided
        if (req.file) {
            updatedFields.image = req.file.filename;
        } else {
            updatedFields.image = blog.image; // Keep the old image if no new one is provided
        }

        await Blog.findByIdAndUpdate(blogId, updatedFields);
        res.redirect('/my-blogs');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating blog');
    }
};




exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        // Ensure the logged-in user is the author
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.redirect('/my-blogs');
        }

        await Blog.findByIdAndDelete(req.params.id);
        res.redirect('/my-blogs');
    } catch (error) {
        console.error(error);
        res.redirect('/my-blogs');
    }
};

