const express = require('express');
const { getPosts, createPost, deletePost, updatePost, getAPost } = require('../controllers/Posts');

const PostsRouter = express.Router()

PostsRouter.route("/").get(getPosts).post(createPost);
PostsRouter.route("/:id").get(getAPost).patch(updatePost).delete(deletePost);

module.exports = PostsRouter