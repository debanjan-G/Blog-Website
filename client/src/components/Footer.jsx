import React from 'react'
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    // <div className=''>
    <div id='footer' className='h-full w-full bg-black p-5 flex flex-col items-center justify-center'>
      <div className="icons flex gap-4 text-xl my-4">
        <FaSquareXTwitter className='text-white hover:text-green-600 hover:cursor-pointer' />
        <FaLinkedin className='text-white hover:text-green-600 hover:cursor-pointer' />
        <FaGithub className='text-white hover:text-green-600 hover:cursor-pointer' />
        <SiGmail className='text-white hover:text-green-600 hover:cursor-pointer' />
      </div>
      <p className='text-white'>Copyright © {currentYear} The Blogger </p>
    </div>
    // </div>
  )
}

export default Footer
