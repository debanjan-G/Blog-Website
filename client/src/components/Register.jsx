import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import authBG from "../assets/Auth-BG-3.jpg"
import Header from './Header';
import Profile from './Profile';

const Register = () => {
  const [userInput,setUserInput] = useState({})
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const [isRegistered,setIsRegistered] = useState(false)
  const [statusCode,setStatusCode] = useState()

  useEffect(() => {
  // Check if userInput has data before making the request
  if (Object.keys(userInput).length > 0) {
    axios.post("/api/v1/auth/register", userInput)
      .then(res => {
        console.log(res);
        const token = res.data.token;
        localStorage.setItem("jwt", token);
        setIsRegistered(true)
        setStatusCode(res.status)
      })
      .catch(err => {
        console.log(err);
      });
  }
}, [userInput]);

  const submitHandler = (event) =>{
    event.preventDefault()
    const username =usernameRef.current.value
    const password = passwordRef.current.value
    const email = emailRef.current.value
  setUserInput({
  username,
  email,
  password
})



  }

  return (
    <>
    <Header/>
    {isRegistered && <Profile statusCode={statusCode}/>}
    {!isRegistered && <div className='bg-cover min-h-screen flex items-center justify-center' style={{backgroundImage: `url(${authBG})`}}>
      <div className=' bg-slate-900 w-1/3 p-10 rounded-lg '>
        <h1 className='text-slate-200 text-4xl my-10 text-center'>REGISTER FOR THE BLOG</h1>
        <form className="flex flex-col gap-4 w-full" onSubmit={submitHandler}>
          <label className='text-[#DBEAFE]'>Username</label>
          <input ref={usernameRef} type="text" name="" id="username" className="bg-[#64748B] text-white py-2 px-4  rounded-md text-xl" />
          <label className='text-[#DBEAFE]'>Email</label>
          <input ref={emailRef} type="email" name="" id="email" className="bg-[#64748B] text-white py-2 px-4  rounded-md text-xl" />
          <label className='text-[#DBEAFE]'>Password</label>
          <input ref={passwordRef} type="password" name="" id="password" className="bg-[#64748B] text-white py-2 px-4  rounded-md text-xl mb-4" />
          <button className='bg-[#DBEAFE] py-2 px-8 rounded-md my-4 w-full opacity-85 hover:opacity-100'>Sign up</button>
        </form>
        <span className='text-white hover:text-green-500'> <Link to="/login">If you already have an account, you can log in here.</Link></span>
        
      </div>
    </div>}
    </>
  );
};

export default Register;
