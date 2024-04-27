import { useEffect, useState } from "react";
import Blog from "./Blog";
import axios from 'axios'
import NoPostsImage from "../../assets/No-posts.png"

const Blogs = () => {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get("/api/v1/posts").then(res => {
      console.log(res);
      setPosts([...res.data.posts])
    }).catch(err => {
      console.log(err);
    })
  }, [])

  if (posts.length === 0) {
    return <div className="flex flex-col items-center justify-center h-screen">

      <h1 className='text-center text-6xl my-4 w-1/2'>Sorry, there are currently no blog posts available.</h1>
      <img src={NoPostsImage} alt="" className="h-80" />
      <h1 className='text-center text-4xl my-4 w-1/2'> Check back later for updates!</h1>
    </div>
  }

  return (

    <div className='text-slate-700 w-full mx-auto my-10' id='blogs'>
      <h1 className='bg-gradient-to-r from-blue-800 via-violet-600 to-indigo-900 bg-clip-text text-transparent text-6xl anton-regular font-semibold text-center my-5'>Recent Blogs</h1>
      <div className="blogs flex items-center flex-col md:flex-row md:flex-wrap md:justify-center  ">
        {posts.map((post) => (
          <Blog
            key={post._id}
            id={post._id}
            title={post.title}
            intro={post.intro}
            tags={post.tags}
            img={post.imageURL}
          />
        ))}
      </div>
    </div>

  );
};

export default Blogs;
