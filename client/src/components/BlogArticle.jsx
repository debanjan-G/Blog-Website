/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

const BlogArticle = () => {
  const [post, setPost] = useState({});
  // const [deleteFlag, setDeleteFlag] = useState(false);
  const { id } = useParams();
  // const token = localStorage.getItem("jwt")
  // let payload = ""
  // if (token) {
  // payload = jwtDecode(token)
  // const issuedAt = payload.iat || null;
  // }


  // const headers = {
  //   'Authorization': `Bearer ${token}`
  // };

  // const handleDelete = () => {
  //   axios.delete(`/api/v1/posts/${post._id}`, { headers }).then(res => {
  //     console.log(res);
  //     if (res.status === 200) {
  //       setDeleteFlag(true);
  //     }
  //   }).catch(err => console.log(err));
  // };

  // const getFormattedDate = (iat) => {
  //   const date = new Date(iat * 1000);
  //   const day = date.getDate();
  //   const monthName = date.toLocaleString('default', { month: 'long' });
  //   const year = date.getFullYear();
  //   const formattedDate = `${monthName} ${day}, ${year}`;
  //   return formattedDate; // Output: April 26, 2024
  // };

  // const date = payload ? getFormattedDate(payload.iat) : null;

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
        <h1 className='text-6xl text-center font-bold anton-regular'>{post.title}</h1>
        {/* <div className='flex gap-10 w-full text-3xl justify-center'>
          <FaRegEdit className='hover:text-green-700 hover:cursor-pointer transition' />
          <MdDelete onClick={handleDelete} className='hover:text-red-500 hover:cursor-pointer transition' />
        </div> */}
        {/* </div> */}
        {/* )} */}

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
