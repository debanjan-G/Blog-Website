import React from 'react'
import Navbar from './Navbar'
import Landing from './Landing'
import Blogs from "./Blogs";
import Contact from "./Contact";
import SearchBar from './SearchBar';

const Home = () => {
  return (
    <div id='home'>
      <Navbar/>
      <SearchBar/> 
      <Landing/>
      <Blogs />
      
        <Contact />
    </div>
  )
}

export default Home