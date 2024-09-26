# Blog Post Panel

## Overview

The **Blog Post Panel** is a web application that allows users to register, log in, and manage their own blog posts. Users can create, read, edit, and delete their blogs while also being able to view blogs posted by other users. Each user has full control over their own blogs but can only view others’ content without modification options.

## Project Stack

- **Frontend (UI):** EJS (Embedded JavaScript)
- **Backend:** Express.js
- **Database:** MongoDB
- **Authentication:** Passport.js (for user registration and login)
- **File Uploads:** Multer (for blog image uploads)

## Features

### User Authentication
- **Register:** Users can create an account.
- **Login:** Users can log in using Passport.js authentication.
- **Session Management:** Maintains user sessions using cookies.

### Blog Management
- **Add Blog:** Users can create a new blog post with a title, content, and an image.
- **Edit Blog:** Users can edit their own blog posts.
- **Delete Blog:** Users can delete their own blog posts.

### View Blogs
- **All Blogs Page:** A public page that displays all users' blogs (view-only).
- **My Blogs Page:** A page where logged-in users can view, edit, or delete only their own blogs.

## Key Routes & Logic

### User Authentication Routes
- `POST /register`: To create a new user.
- `POST /login`: To log in the user using Passport.js.
- `GET /logout`: To log out the user.

### Blog Routes
- `GET /blogs`: View all users' blogs.
- `GET /my-blogs`: View logged-in user’s blogs (with edit/delete options).
- `POST /blogs/add`: Add a new blog (with file upload).
- `POST /blogs/edit/:id`: Edit a specific blog (only by the author).
- `DELETE /blogs/delete/:id`: Delete a specific blog (only by the author).

## Additional Learning Points
- Importance of user authentication and authorization.
- Handling file uploads securely.
- Structuring Express.js applications with MongoDB.
- Creating a dynamic UI with EJS.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/blog-post-panel.git
   cd blog-post-panel
