const Blog = require('../models/Blog');
const multer = require('multer');

// Blog logic for Add, Edit, Delete
exports.getAllBlogs = async (req, res) => {
    const blogs = await Blog.find({});
    res.render('allBlogs', { blogs });
};

exports.getMyBlogs = async (req, res) => {
    const blogs = await Blog.find({ author: req.user.id });
    res.render('myBlogs', { blogs });
};

exports.addBlog = async (req, res) => {
    const { title, content } = req.body;
    const blog = new Blog({
        title,
        content,
        image: req.file.path,
        author: req.user.id
    });

    await blog.save();
    res.redirect('/my-blogs');
};

exports.editBlog = async (req, res) => {
    const { title, content } = req.body;
    await Blog.findByIdAndUpdate(req.params.id, { title, content });
    res.redirect('/my-blogs');
};

exports.deleteBlog = async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/my-blogs');
};
