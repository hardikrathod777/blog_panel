const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
const blogController = require('../controllers/blogController');
const multer = require('multer');
const upload = require('../config/multer.js');


router.get('/blogs', ensureAuthenticated, blogController.getAllBlogs);
router.get('/my-blogs', ensureAuthenticated, blogController.getMyBlogs);
router.get('/add-blog', (req, res) => res.render('addBlog')); // Render add blog form
router.post('/add-blog', ensureAuthenticated, upload.single('image'), blogController.addBlogPost); // Fix here
router.get('/edit-blog/:id', ensureAuthenticated, blogController.getEditBlog);
router.post('/edit-blog/:id', ensureAuthenticated, upload.single('image'), blogController.postEditBlog);
router.post('/delete-blog/:id', ensureAuthenticated, blogController.deleteBlog);
router.get('/blogs', ensureAuthenticated,blogController.getAllBlogs);


module.exports = router;
