const { StatusCodes } = require("http-status-codes")
const Post = require("../models/Post")
const { NotFoundError } = require("../errors")

// const getPosts = async(req,res) =>{

//     const posts = await Post.find({})
//     res.status(StatusCodes.OK).json({success:true,PostCount:posts.length,posts})
// }


const createPost = async (req, res) => {

    const { title, intro, content, tags, image: imageURL } = req.body;
    const { user } = req;

    const post = new Post({ title, intro, content, tags, imageURL, author: user.id })
    await post.save()

    res.status(StatusCodes.CREATED).json({ success: true, post })

}


// const getAPost = async(req,res) =>{

//     const postID = req.params.id;
//     const post = await Post.findById(postID)
//     if(!post){
//         throw new NotFoundError("Post Not Found")
//     }
//     res.status(StatusCodes.OK).json({success:true,post})
// }

const updatePost = async (req, res) => {

    const postID = req.params.id;
    const updatedPost = await Post.findByIdAndUpdate(postID, { ...req.body }, { new: true, runValidators: true })

    if (!updatedPost) {
        throw new NotFoundError("Post Not Found")
    }

    res.status(StatusCodes.OK).json({ success: true, updatedPost })
}

const deletePost = async (req, res) => {

    const postID = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(postID)

    if (!deletedPost) {
        throw new NotFoundError("Post Not Found")
    }

    res.status(StatusCodes.OK).json({ success: true, deletedPost })
}

const likePost = async (req, res) => {
    const postId = req.params.id
    const userId = req.user.id
    console.log(userId)
    try {
        const post = await Post.findById(postId)
        if (!post) {
            throw new NotFoundError("Post not found")
        }
        if (post.likedBy.includes(userId)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "You have already liked this post" });
        }
        post.likes += 1;
        post.likedBy.push(userId);

        await post.save()

        res.status(StatusCodes.OK).json({ success: true, message: "Post liked successfully", likes: post.likes });
    } catch (err) {
        console.error("error liking post", err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `${err}` });
    }
}

module.exports = { createPost, updatePost, deletePost, likePost }