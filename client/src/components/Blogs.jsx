import blogPosts from "../data/BlogPosts"
import Blog from "./Blog";

const Blogs = () => {
  return (
    <div className='text-slate-700 w-full mx-auto mb-10' id='blogs'>
      <h1 className='text-center text-4xl my-4'>LATEST BLOG POSTS</h1>
      <div className="blogs flex flex-wrap justify-evenly">
      {blogPosts.map((post, index) => (
        <Blog 
          key={index} 
          title={post.title} 
          content={post.content} 
          tag={post.tag} 
          img={post.image}
        />
      ))}
      </div>
     </div>
  );
};

export default Blogs;
