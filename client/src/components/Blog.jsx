/* eslint-disable react/prop-types */
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Blog = ({id,title,intro,img,tag}) => {

  const navigate = useNavigate()
const handleClick = () =>{
  navigate(`/blog/${id}`)
}

  return (
    <div className='flex flex-col items-center justify-center w-1/4 mx-4'>
    <img src={img} alt="" className='h-52 hover:cursor-pointer hover:scale-105 transition'  onClick={handleClick}/>
    <p className='my-4 text-blue-600'>{tag}</p>
      <h1 className='text-2xl font-semibold text-center'>{title}</h1>
      <p className='text-lg text-center my-4'>{intro}</p>
    </div>
  )
}

export default Blog
