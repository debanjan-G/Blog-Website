import React from 'react'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'


const Navbar = () => {

  const handleAnchorTagClick = (e,id) =>{
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth' // Smooth scrolling behavior
      });
    }
  }
  

  return (
    <div className=' ' >
   <div className="links  p-4 flex justify-start gap-10 font-semibold">
<h1>❤️</h1>
     <a href="#home" onClick={(e)=>handleAnchorTagClick(e,'home')}>Home</a>
     <a href="#blogs" onClick={(e)=>handleAnchorTagClick(e,'blogs')}>Blogs</a>
     <a href="#about" onClick={(e)=>handleAnchorTagClick(e,'about')}>About</a>
     <a href="#contact" onClick={(e)=>handleAnchorTagClick(e,'contact')}>Contact</a>
      </div>
      <div>
        <SearchBar/>    
      </div>
      {/* </div> */}
      {/* <div className="flex justify-end"> */}
       
      {/* </div> */}
    </div>
  )
}

export default Navbar