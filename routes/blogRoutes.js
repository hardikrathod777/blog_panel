const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
const blogController = require('../controllers/blogController');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });

router.get('/blogs', blogController.getAllBlogs);
router.get('/my-blogs', ensureAuthenticated, blogController.getMyBlogs);
router.post('/blogs/add', ensureAuthenticated, upload.single('image'), blogController.addBlog);
router.post('/blogs/edit/:id', ensureAuthenticated, blogController.editBlog);
router.delete('/blogs/delete/:id', ensureAuthenticated, blogController.deleteBlog);

module.exports = router;
