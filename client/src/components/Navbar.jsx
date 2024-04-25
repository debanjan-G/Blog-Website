
import { Link } from 'react-router-dom';
import Button from './Button';
import SearchBar from './SearchBar'


import React from 'react';

const Navbar = () => {
  let profileRoute = "/login"
  if (localStorage.getItem("jwt")) {
    profileRoute = "/profile"
  }

  const handleAnchorTagClick = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth' // Smooth scrolling behavior
      });
    }
  };

  return (
    // <div>
    <div className='flex justify-between items-center p-4'>
      <div className="links flex gap-10 font-semibold">
        <h1>❤️</h1>
        <Link to="/" onClick={(e) => handleAnchorTagClick(e, 'home')}>Home</Link>
        <Link to="/blogs" onClick={(e) => handleAnchorTagClick(e, 'blogs')}>Blogs</Link>
        <Link to="/about" onClick={(e) => handleAnchorTagClick(e, 'about')}>About</Link>
        <Link to="/contact" onClick={(e) => handleAnchorTagClick(e, 'contact')}>Contact</Link>
        <Link to={profileRoute}>Profile</Link>
      </div>
      <div className='flex gap-2'>
        {/* <Link to="/register"> <Button >Register</Button></Link> */}
        <Link to="/login"> <Button >Log In</Button></Link>



      </div>

    </div>

    // </div>
  );
};

export default Navbar;
