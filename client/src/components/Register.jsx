import React from 'react';
import { Link } from 'react-router-dom';

import authBG from "../assets/Auth-BG-3.jpg"
import Navbar from './Navbar';
import Header from './Header';

const Register = () => {
  return (
    <>
    <Header/>
    <div className='bg-cover min-h-screen flex items-center justify-center' style={{backgroundImage: `url(${authBG})`}}>
      <div className=' bg-slate-900 w-1/3 p-10 rounded-lg '>
        <h1 className='text-slate-200 text-4xl my-10 text-center'>REGISTER FOR THE BLOG</h1>
        <form action="" className="flex flex-col gap-4 w-full ">
          <label className='text-[#DBEAFE]'>Name</label>
          <input type="text" name="" id="" className="bg-[#64748B] text-white py-2 px-4  rounded-md text-xl" />
          <label className='text-[#DBEAFE]'>Email</label>
          <input type="email" name="" id="" className="bg-[#64748B] text-white py-2 px-4  rounded-md text-xl" />
          <label className='text-[#DBEAFE]'>Password</label>
          <input type="password" name="" id="" className="bg-[#64748B] text-white py-2 px-4  rounded-md text-xl mb-4" />
        </form>
        <span className='text-white hover:text-green-500'> <Link to="/login">If you already have an account, you can log in here.</Link></span>
        <button className='bg-[#DBEAFE] py-2 px-8 rounded-md my-4 w-full opacity-85 hover:opacity-100'>Sign up</button>
      </div>
    </div>
    </>
  );
};

export default Register;
