  const express = require('express');

  const app = express()
  require('dotenv').config()

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

  // Middlewares
  app.use(express.json())
  app.use("/api/v1/posts",authenticationMiddleware,PostsRouter)
  app.use("/api/v1/auth",AuthRouter)
  app.use(customErrorHandler)

  const port = process.env.PORT || 5000;

  app.get("/",(req,res)=>{
      res.send("VAT PROJECT")
  })

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