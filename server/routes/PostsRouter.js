const express = require('express');
const { createPost, deletePost, updatePost, likePost, } = require('../controllers/Posts');

const PostsRouter = express.Router()

// PostsRouter.route("/").get(getPosts).post(createPost);
PostsRouter.route("/").post(createPost);
PostsRouter.route("/:id").patch(updatePost).delete(deletePost);
PostsRouter.route("/:id/like").post(likePost)

module.exports = PostsRouter