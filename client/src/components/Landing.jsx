import React from 'react';
import LandingBG from "../assets/LandingBG.jpg";

const App = () => {
  return (
    <div className="bg-cover p-5 bg-center h-screen " style={{backgroundImage: `url(${LandingBG})`}}>
      {/* Your content here */}
      <div className=' flex gap-10 flex-col h-full justify-center items-center w-[50%] mx-auto'>
      <h1 className='text-slate-200 text-7xl anton-regular font-bold text-center'>Ignite Your Creativity with the World of Blogging</h1>
      <p className='text-slate-300 font-semibold text-2xl my-2 text-center advent-pro-medium '>Step into a realm where imagination knows no bounds. This is a vibrant community where every voice is celebrated. Whether you're a seasoned wordsmith or just starting out, you can always find inspiration and support here. Happy Blogging!</p>
      <button className='bg-slate-200 py-4 px-6 font-semibold rounded-lg w-1/2 text-xl opacity-90 hover:opacity-100'>Sign up for Free</button>
      </div>
    </div>
  );
};

export default App;
