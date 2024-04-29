const express = require('express')
const getUserDetails = require('../controllers/User')
const UserRouter = express.Router()

UserRouter.get("/:id",getUserDetails)


module.exports = UserRouter

// /api/v1/profile/<id>