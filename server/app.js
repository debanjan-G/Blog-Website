  const express = require('express');

  const app = express()
  require('dotenv').config()

  const {StatusCodes} = require('http-status-codes')


  // Importing the Post model
  const Post = require("./models/Post")

  // Try Catch wrapper for async route handlers
  require('express-async-errors')

  // db
  const connectDB = require('./db/connect');

  // Routers
  const PostsRouter = require('./routes/PostsRouter');
  const AuthRouter = require('./routes/AuthRouter');

  //Importing Middlewares
  const customErrorHandler = require("./middlewares/custom-error");
  const authenticationMiddleware = require('./middlewares/authenticate');

  // Defining some routes directly
  app.get("/",(req,res)=>{
      res.send("VAT PROJECT")
  })

  // Creating GET all posts route outside router (containing auth middleware) so that anyone can get all posts without authentication
  app.get("/api/v1/posts",async(req,res)=>{
    const posts = await Post.find({})
    res.status(StatusCodes.OK).json({success:true,PostCount:posts.length,posts})
  })

  // Middlewares
  app.use(express.json())
  app.use("/api/v1/posts",authenticationMiddleware,PostsRouter)
  app.use("/api/v1/auth",AuthRouter)
  app.use(customErrorHandler)

  const port = process.env.PORT || 5000;

 

  const start = async() =>{
      try {
          await connectDB(process.env.MONGO_URI)
          console.log("Connection to DB successfully established.");
        app.listen(port,()=>{
          console.log(`Server is listening for requests on Port ${port}.`);
        })  
      } catch (error) {
          console.log(error);
      }
  }

  start()