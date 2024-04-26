/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Header from './Header';
import { jwtDecode } from 'jwt-decode';
import ProfileWelcomeImg from "../assets/Profile-welcome.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Blog from './Blog';

const Profile = ({ statusCode }) => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("jwt");
  const decoded = jwtDecode(token);
  console.log(decoded.id);

  useEffect(() => {
    axios.get(`/api/v1/profile/${decoded.id}`).then(res => {
      console.log(res);
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

  const { username, email } = decoded;

  return (
    <>
      <div className='flex justify-between m-2 '>
        <Header />
        <button className='bg-slate-900 py-4 px-10 opacity-90 text-white font-bold hover:opacity-100' onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className='h-screen flex flex-col items-center w-1/2 mx-auto justify-center'>
        <h1 className='text-6xl font-bold my-4 anton-regular'>Welcome to The Blog, {username}</h1>
        <div className="flex gap-2">
          <p className='text-slate-600 border-2 p-4 rounded-md'>{email}</p>
          {posts.length > 0 ? <p className='text-slate-600 border-2 p-4 rounded-md'>Blogs written: {posts.length}</p> : <p className='text-slate-600 border-2 p-4 rounded-md'>{message}</p>}
        </div>

        <img src={ProfileWelcomeImg} alt="" className='object-contain h-80 my-5 rounded-xl' />

        <p className='text-slate-700 text-2xl text-center'>{welcomeMsg}</p>
        <button className='bg-slate-900 py-4 px-10 opacity-90 text-white font-bold hover:opacity-100 my-4 text-lg' onClick={() => { navigate("/create-blog") }}>
          Compose New Blog
        </button>
      </div>

      {posts.length > 0 &&
        <div>
          <h1 className='text-4xl font-semibold text-center my-5'>Your posts:</h1>
          <div className="blogs flex flex-col justify-center items-center  md:flex-row md:flex-wrap md:justify-evenly">
            {posts.map((post) => (
              <Blog
                key={post._id}
                id={post._id}
                title={post.title}
                intro={post.intro}
                tags={post.tags}
                img={post.imageURL}
                isLoggedIn={true}
              />
            ))}
          </div>
        </div>
      }
    </>
  );
}

export default Profile;
