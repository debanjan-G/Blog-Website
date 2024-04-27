/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Layout/Header';
import axios from 'axios';

const BlogArticle = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();

  useEffect(() => {

    axios.get(`/api/v1/posts/${id}`).then(res => {
      console.log(res);
      setPost(res.data.post);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  return (
    <>
      <Header />

      {/* {deleteFlag ? <DeleteSuccessful /> : ( */}
      <div className='text-center flex flex-col items-center m-10 p-10 gap-10 titillium-web-regular'>
        <h1 className='bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent text-6xl  text-center font-bold anton-regular'>{post.title}</h1>


        <div className="flex gap-2 flex-wrap justify-center">
          {post.tags && post.tags.map((tag, index) => <p key={index} className='text-lg font-semibold text-center my-1 bg-sky-400 text-slate-800 p-3 rounded-lg'>{tag}</p>)}
        </div>
        {/* <div className='text-center'>
        <p className='text-slate-600'>By {payload.username}</p>
        <p className='text-slate-600'>{date}</p>
      </div> */}


        <p className='text-2xl font-semibold'>{post.intro}</p>
        <img src={post.imageURL} className='h-96 rounded-lg object-cover' alt="" />
        <p className='text-left text-xl'>{post.content}</p>

      </div>
    </>
  )
}

export default BlogArticle;
