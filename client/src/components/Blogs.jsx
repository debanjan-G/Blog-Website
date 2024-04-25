import blogPosts from "../data/BlogPosts"
import Blog from "./Blog";
import Header from "./Header";

const Blogs = () => {
  return (

    <div className='text-slate-700 w-full mx-auto mb-10' id='blogs'>
      <h1 className='text-center text-4xl my-4'>LATEST BLOG POSTS</h1>
      <div className="blogs flex items-center flex-col md:flex-row md:flex-wrap md:justify-evenly">
        {blogPosts.map((post) => (
          <Blog
            key={post.id}
            id={post.id}
            title={post.title}
            intro={post.intro}
            tag={post.tag}
            img={post.image}
          />
        ))}
      </div>
    </div>

  );
};

export default Blogs;
