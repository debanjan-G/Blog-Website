/* eslint-disable react/prop-types */
import React from 'react'
import Header from './Header'
import { jwtDecode } from 'jwt-decode'
import ProfileWelcomeImg from "../assets/Profile-welcome.png"
import Button from './Button'
import { useNavigate } from 'react-router-dom'

const Profile = ({ statusCode }) => {

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("jwt")
    navigate("/")
  }

  const token = localStorage.getItem("jwt")
  const decoded = jwtDecode(token)
  console.log(decoded);

  let welcomeMsg = "Hello there! 🎈 Thanks for joining us. We're thrilled to have you here. Happy browsing!"

  if (statusCode === 201) { // Registered
    welcomeMsg = "Congratulations! 🎉 You're officially part of our blog community. Let the reading adventures begin!"
  }
  else if (statusCode === 200) { // Login
    welcomeMsg = "Welcome back! 🌟 You're all set to dive into the latest posts and discussions. Enjoy your stay!"
  }

  const { username, email } = decoded


  return (
    <>
      <div className='flex justify-between m-2'>

        <Header />
        <button className='bg-slate-900 py-4 px-10 opacity-90 text-white font-bold hover:opacity-100' onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className=' h-screen flex flex-col flex-wrap items-center w-1/2 mx-auto justify-center'>
        <h1 className='text-6xl font-bold my-4 anton-regular'>Welcome to The Blog, {username}</h1>
        <p className='text-slate-600 border-2 p-4 rounded-md'>{email}</p>
        <img src={ProfileWelcomeImg} alt="" className='object-contain h-80 my-5 rounded-xl' />
        <p className='text-slate-700 text-2xl text-center'>{welcomeMsg}</p>
        <button className='bg-slate-900 py-4 px-10 opacity-90 text-white font-bold hover:opacity-100 my-4 text-lg' onClick={() => { navigate("/create-blog") }}>
          Compose New Blog
        </button>

      </div>
    </>

  )
}

export default Profile
