const express = require('express')
const {getUserPosts,getUserDetails, deleteUser} = require('../controllers/User')
const UserRouter = express.Router()

UserRouter.get("/:id/posts",getUserPosts)
UserRouter.route("/:id").get(getUserDetails).delete(deleteUser)
// UserRouter.get("/:id",getUserDetails).delete(deleteUser)


module.exports = UserRouter 

// /api/v1/profile/<id>