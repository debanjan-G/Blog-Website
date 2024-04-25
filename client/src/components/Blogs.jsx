import { useEffect, useState } from "react";
// import blogPosts from "../data/BlogPosts"
import Blog from "./Blog";
import axios from 'axios'


const Blogs = () => {

  const [posts, setPosts] = useState([])

  // const token = localStorage.getItem("jwt")
  // const headers = {
  //   'Authorization': `Bearer ${token}`,
  //   'Content-Type': 'application/json'
  // }

  useEffect(() => {
    axios.get("/api/v1/posts").then(res => {
      console.log(res);

      setPosts([...res.data.posts])
    }).catch(err => {
      console.log(err);
    })
  }, [])

  return (

    <div className='text-slate-700 w-full mx-auto mb-10' id='blogs'>
      <h1 className='text-center text-4xl my-4'>LATEST BLOG POSTS</h1>
      <div className="blogs flex items-center flex-col md:flex-row md:flex-wrap md:justify-evenly">
        {posts.map((post) => (
          <Blog
            key={post._id}
            id={post._id}
            title={post.title}
            intro={post.intro}
            // tag={post.tag}
            img={post.imageURL}
          />
        ))}
      </div>
    </div>

  );
};

export default Blogs;
