/* eslint-disable react/prop-types */
import React from 'react'
import LazyLoad from 'react-lazyload'
import { useNavigate } from 'react-router-dom'

const Blog = ({ id, title, intro, img, tags }) => {

  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/blog/${id}`)
  }

  return (
    <div className='flex flex-col items-center justify-center w-1/4 mx-4'>
      <LazyLoad>
        <img src={img} alt="" className='h-52 hover:cursor-pointer hover:scale-105 transition my-4' onClick={handleClick} />
      </LazyLoad>
      <div className="flex gap-2 flex-wrap justify-center" >
        {tags && tags.map((tag, index) => <p key={index} className='text-sm font-semibold text-center my-1 bg-sky-400 text-slate-800 p-2 rounded-lg'>{tag}</p>)}
      </div>
      {/* <p className='my-4 text-blue-600'>{tag}</p> */}
      <h1 className='text-2xl font-semibold text-center'>{title}</h1>
      <p className='text-lg text-center my-4'>{intro}</p>


    </div>
  )
}

export default Blog
