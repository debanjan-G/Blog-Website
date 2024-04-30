/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Header from '../Layout/Header';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Blog from '../Blog/Blog';

const Profile = ({ statusCode }) => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("jwt");
  const decoded = jwtDecode(token);
  console.log(decoded.id);

  useEffect(() => {
    axios.get(`/api/v1/profile/${decoded.id}/posts`).then(res => {
      // console.log(res);
      if (res.data.posts.length === 0) {
        setMessage(res.data.message);
      }
      setPosts([...res.data.posts]);
    }).catch(err => console.log(err));
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };

  console.log(decoded);

  let welcomeMsg = "Welcome back! 🌟 You're all set to dive into the latest posts and discussions. Enjoy your stay!";

  if (statusCode === 201) { // Registered
    welcomeMsg = "Congratulations! 🎉 You're officially part of our blog community. Let the reading adventures begin!";
  }

  const { username, email, dp } = decoded;

  return (
    <div className=''>
      <div className='flex justify-between items-center m-2 '>
        <Header />
        <button className='bg-slate-900 h-full py-3 px-10 opacity-90 text-white font-bold hover:opacity-100' onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className=' flex flex-col items-center h-screen w-1/2 mx-auto justify-center'>
        <h1 className="text-7xl text-center font-bold my-6 anton-regular bg-gradient-to-r from-rose-500 via-red-600 to-red-800 bg-clip-text text-transparent">
          Its good to have you back, {username}
        </h1>
        <div className="flex gap-2">
          <p className='text-slate-600 border-2 p-4 rounded-md'>{email}</p>
          {posts.length > 0 ? <p className='text-slate-600 border-2 p-4 rounded-md'>Blogs written: {posts.length}</p> : <p className='text-slate-600 border-2 p-4 rounded-md'>{message}</p>}
        </div>
        {!posts.length > 0 &&
          <>
            <img src={dp} alt="DP" className='object-cover h-52 my-5 rounded-xl' />
            <p className='text-slate-700 text-2xl text-center'>{welcomeMsg}</p>
          </>
        }
        <button className='bg-slate-900 py-4 px-10 opacity-90 text-white font-bold hover:opacity-100 my-4 text-lg' onClick={() => { navigate("/create-blog") }}>
          Compose New Blog
        </button>
      </div>

      {posts.length > 0 &&
        <div>
          <h1 className='text-5xl anton-regular text-center px-4 my-4'>YOUR POSTS</h1>
          <div className="blogs flex flex-col justify-center">
            {posts.map((post) => (
              <Blog
                key={post._id}
                id={post._id}
                title={post.title}
                intro={post.intro}
                content={post.content}
                tags={post.tags}
                img={post.imageURL}
                author={post.author}
                createdAt={post.createdAt}
                isLoggedIn={true}
              />
            ))}
          </div>
        </div>
      }
    </div>
  );
}

export default Profile;
