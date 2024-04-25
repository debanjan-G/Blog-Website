/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import blogPosts from '@/data/BlogPosts'
import Header from './Header'
import axios from 'axios'

const BlogArticle = () => {
  const [post, setPost] = useState({})
  const { id } = useParams()
  const token = localStorage.getItem("jwt")
  const headers = {
    'Authorization': `Bearer ${token}`
  }

  useEffect(() => {
    axios.get(`/api/v1/posts/${id}`, { headers }).then(res => {
      console.log(res);
      setPost(res.data.post)
    }).catch(error => {
      console.log(error);
    })
  }, [])

  // const post = blogPosts.find(post => post.id === Number(id));
  return (
    <>
      <Header />

      <div className='text-center flex flex-col items-center m-10 p-10 gap-10 titillium-web-regular'>
        {/* <p>Article - {id}</p> */}
        <h1 className='text-6xl text-center font-bold anton-regular'>{post.title}</h1>
        <p className='text-2xl font-semibold'>{post.intro}</p>
        <img src={post.imageURL} className='h-96 rounded-lg object-cover' alt="" />
        <p className='text-left text-xl '>{post.content}</p>
        {/* <p>Author</p> */}
      </div>
    </>
  )
}

export default BlogArticle
