import React, { useEffect, useRef, useState } from 'react'
import CreateBlogBG from "../assets/create-blog-bg2.jpg"
import Header from './Header'
import axios from "axios"
import PostCreated from './PostCreated'
import LazyLoad from 'react-lazyload'

const CreateBlogForm = () => {
    const [userInput, setUserInput] = useState({})
    const [success, setSuccess] = useState(false)
    const titleRef = useRef()
    const introRef = useRef()
    const contentRef = useRef()
    const tagsRef = useRef()
    const imageRef = useRef()

    const token = localStorage.getItem("jwt")
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }

    useEffect(() => {

        if (Object.keys(userInput).length > 0) {
            axios.post("/api/v1/posts", { ...userInput }, { headers }).then(res => {
                console.log(res);
                if (res.data.success === true) {
                    setSuccess(true)
                }
            }).catch(err => {
                console.log(err);
            })
        }

    }, [userInput])

    const handleSubmit = (event) => {
        event.preventDefault()
        setSuccess(false)
        const title = titleRef.current.value;
        const intro = introRef.current.value;
        const content = contentRef.current.value;
        const image = imageRef.current.value;

        const tagString = tagsRef.current.value;
        const tags = tagString.split(",");

        console.log(title, intro, content, image, tags);
        setUserInput({ title, intro, content, image, tags })

    }

    if (success) {
        return <PostCreated />;
    }


    return (
        <>

            {/* <LazyLoad> */}
            <div className="bg-cover py-2 px-4 bg-center h-full opacity-90 " style={{ backgroundImage: `url(${CreateBlogBG})` }}>
                <Header />
                <h1 className='text-6xl text-[#EEEEEE] font-bold  text-center my-5'>CREATE NEW BLOG</h1>
                <form onSubmit={handleSubmit} className='bg-[#222831] flex flex-col gap-2 py-6 rounded-lg px-10 w-3/4 my-5 mx-auto '>
                    <label className='text-xl text-[#EEEEEE]'>Title</label>
                    <input ref={titleRef} required className='rounded-lg text-2xl text-[#222831] font-semibold bg-[#EEEEEE] py-2 px-4 w-full' type="text" name="" id="title" />

                    <label className='text-xl text-[#EEEEEE]'>Intro</label>
                    <input ref={introRef} required className='rounded-lg text-2xl text-[#222831] font-semibold bg-[#EEEEEE] py-2 px-4 w-full' type="text" name="" id="intro" />

                    <label className='text-xl text-[#EEEEEE]'>Content</label>
                    <textarea ref={contentRef} required className='rounded-lg text-2xl text-[#222831] font-semibold bg-[#EEEEEE] py-2 px-4 w-full resize-none' name="" id="content" rows="10" />

                    <label className='text-xl text-[#EEEEEE]'>Tags</label>
                    <input ref={tagsRef} className='rounded-lg text-2xl text-[#222831] font-semibold bg-[#EEEEEE] py-2 px-4 w-full' type="text" name="" id="tags" placeholder="Enter tags (comma-separated)" />

                    <label className='text-xl text-[#EEEEEE]'>ImageURL</label>
                    <input ref={imageRef} required className='rounded-lg text-2xl text-[#222831] font-semibold bg-[#EEEEEE] py-2 px-4 w-full' type="text" name="" id="image" />

                    <button className='my-4 w-1/4 mx-auto mb-10 bg-[#00ADB5] py-4 px-10 opacity-90 text-white text-2xl font-bold hover:opacity-100'>Create</button>
                </form>
            </div>
            {/* </LazyLoad> */}
        </>
    )
}

export default CreateBlogForm