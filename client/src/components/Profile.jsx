import React from 'react'
import Header from './Header'
import { jwtDecode } from 'jwt-decode'
import ProfileWelcomeImg from "../assets/Profile-welcome.png"
import Button from './Button'

const Profile = ({statusCode}) => {

const token = localStorage.getItem("jwt")
const decoded = jwtDecode(token)
console.log(decoded);

let welcomeMsg = "Hello there! 🎈 Thanks for joining us. We're thrilled to have you here. Happy browsing!"

if(statusCode === 201){ // Registered
 welcomeMsg = "Congratulations! 🎉 You're officially part of our blog community. Let the reading adventures begin!"
}
else if(statusCode === 202){ // Login
welcomeMsg = "Welcome back! 🌟 You're all set to dive into the latest posts and discussions. Enjoy your stay!"
}

const {username,email} =decoded


  return (
    <>
    <div className='flex justify-between m-2'>

    <Header/>
    <Button>Logout</Button>
    </div>
        
        <div className=' h-screen flex flex-col flex-wrap items-center w-1/2 mx-auto justify-center'>
      <h1 className='text-5xl my-4 anton-regular'>Welcome to The Blog, {username}</h1>
      <p className='text-slate-600 border-2 p-4 rounded-md'>{email}</p>
      <img src={ProfileWelcomeImg} alt="" className='object-contain h-80 my-5 rounded-xl'/>
      <p className='text-slate-700 text-2xl text-center'>{welcomeMsg}</p>
   
    
    </div>
    </>
 
  )
}

export default Profile
