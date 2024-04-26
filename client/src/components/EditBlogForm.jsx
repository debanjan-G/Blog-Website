/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const EditBlogForm = () => {
    const location = useLocation();
    const { id, title, intro, content, img, tags } = location.state;
    const navigateTo = useNavigate()

    const [userInput, setUserInput] = useState({
        title: title,
        intro: intro,
        content: content,
        img: img,
        tags: tags,
    });


    const handleInputChange = (e) => {
        console.log(e.target);
        const { name, value } = e.target;
        if (name === "tags") {
            setUserInput(prevInput => ({ ...prevInput, tags: value.split(',') }))
        } else {
            setUserInput(prevInput => ({
                ...prevInput,
                [name]: value,
            }));
        }

    };

    const token = localStorage.getItem("jwt")

    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const editBlog = (e) => {
        e.preventDefault()
        axios.patch(`/api/v1/posts/${id}`, { ...userInput }, { headers }).then(res => {
            console.log(res);
            if (res.status === 200) {
                navigateTo("/profile/edited")
            }
        }).catch(err => console.log(err))
    }





    return (
        <div className='bg-gradient-to-r from-fuchsia-500 to-cyan-500 w-full'>
            <Header />
            <h1 className='text-6xl text-[#EEEEEE] font-bold  text-center my-5 '>EDIT BLOG</h1>
            <form onSubmit={editBlog} className='bg-[#222831] flex flex-col gap-2 py-6 rounded-lg px-10 w-3/4 my-5 mx-auto '>
                <label className='text-xl text-[#EEEEEE]'>Title</label>
                <input
                    value={userInput.title}
                    onChange={handleInputChange}
                    required
                    className='rounded-lg text-2xl text-[#222831] font-semibold bg-[#EEEEEE] py-2 px-4 w-full'
                    type='text'
                    name='title'
                    id='title'
                />

                <label className='text-xl text-[#EEEEEE]'>Intro</label>
                <input
                    value={userInput.intro}
                    onChange={handleInputChange}
                    required
                    className='rounded-lg text-2xl text-[#222831] font-semibold bg-[#EEEEEE] py-2 px-4 w-full'
                    type='text'
                    name='intro'
                    id='intro'
                />

                <label className='text-xl text-[#EEEEEE]'>Content</label>
                <textarea
                    value={userInput.content}
                    onChange={handleInputChange}
                    required
                    className='rounded-lg text-2xl text-[#222831] font-semibold bg-[#EEEEEE] py-2 px-4 w-full resize-none'
                    name='content'
                    id='content'
                    rows='10'
                />

                <label className='text-xl text-[#EEEEEE]'>Tags</label>
                <input
                    value={userInput.tags}
                    onChange={handleInputChange}
                    className='rounded-lg text-2xl text-[#222831] font-semibold bg-[#EEEEEE] py-2 px-4 w-full'
                    type='text'
                    name='tags'
                    id='tags'
                    placeholder='Enter tags (comma-separated)'
                />

                <label className='text-xl text-[#EEEEEE]'>ImageURL</label>
                <input
                    value={userInput.img}
                    onChange={handleInputChange}
                    required
                    className='rounded-lg text-2xl text-[#222831] font-semibold bg-[#EEEEEE] py-2 px-4 w-full'
                    type='text'
                    name='img'
                    id='image'
                />

                <button
                    type='submit'
                    className='my-4 w-1/4 mx-auto mb-10 bg-[#00ADB5] py-4 px-10 opacity-90 text-white text-2xl font-bold hover:opacity-100'

                >
                    Edit Blog
                </button>
            </form>
        </div>
    );
};

export default EditBlogForm;
