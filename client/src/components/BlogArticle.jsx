/* eslint-disable react/prop-types */
import React from 'react'
import { useParams } from 'react-router-dom'
import blogPosts from '@/data/BlogPosts'
import Header from './Header'

const BlogArticle = () => {
  const {id} = useParams()
  const post = blogPosts.find(post => post.id === Number(id));
  return (
    <>
      <Header/>
   
    <div className='text-center flex flex-col items-center m-10 p-10 gap-10 titillium-web-regular'>
    <p>Article - {id}</p>
      <h1 className='text-6xl text-center font-bold anton-regular'>{post.title}</h1>
<p className='text-2xl font-semibold'>{post.intro}</p>
<img src={post.image} className='h-96 rounded-lg object-cover' alt="" />
<p className='text-left text-xl '>{post.content}</p>
{/* <p>Author</p> */}
</div>
</>
  )
}

export default BlogArticle
