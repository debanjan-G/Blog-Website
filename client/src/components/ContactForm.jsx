import React from 'react';
import { Link } from 'react-router-dom';
import authBG from "../assets/Auth-BG-3.jpg"
import Header from './Header';

const ContactForm = () => {
  return (
    <>
      <Header/>
   
    <div className='bg-cover h-screen flex items-center justify-center' style={{backgroundImage: `url(${authBG})`}}>
      <div className=' bg-slate-900 w-1/3 p-10 rounded-lg'>
        <h1 className='text-slate-200 text-4xl my-10 text-center'>Drop Us a Line</h1>
        <form action="" className="flex flex-col gap-4 w-full text-lg">
          <label className='text-[#DBEAFE]'>Name</label>
          <input type="text" name="" id="" className="bg-[#64748B] text-white py-2 px-4  rounded-md " />
          <label className='text-[#DBEAFE]'>Email</label>
          <input type="email" name="" id="" className="bg-[#64748B] text-white py-2 px-4  rounded-md " />
          <label className='text-[#DBEAFE]'>Message</label>
          <textarea className="bg-[#64748B] text-white py-2 px-4  rounded-md  resize-none " rows="3" />
        </form>
        {/* <span className='text-white hover:text-green-500 '> <Link to="/register">New here? Click to register.</Link></span> */}
        <button className='bg-[#DBEAFE] py-2 px-8 rounded-md my-6 w-full opacity-85 hover:opacity-100'>Submit</button>
      </div>
    </div>
    </>
  );
};

export default ContactForm;
