const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title:{
    type:String,
    maxlength:100,
    required:[true,"Kindly provide a title for the blog "],
},
content:{
    type:String,
    maxlength:1000,
    required:[true,"Kindly provide the content for the blog "],
},
author:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:[true,"Please provide author name"]
},
}

)

const Post = new mongoose.model("post",PostSchema)

module.exports = Post