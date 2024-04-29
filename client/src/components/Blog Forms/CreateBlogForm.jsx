import { useEffect, useRef, useState } from 'react'
import Header from '../Layout/Header'
import axios from "axios"
import PostCreated from '../Action Response/PostCreated'
import Loader from '../Utils/Loader'

const CreateBlogForm = () => {
    const [userInput, setUserInput] = useState({})
    const [success, setSuccess] = useState(false)
    const [imageData, setImageData] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const titleRef = useRef()
    const introRef = useRef()
    const contentRef = useRef()
    const tagsRef = useRef()
    // const imageRef = useRef()

    const token = localStorage.getItem("jwt")


    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }

    useEffect(() => {
        if (Object.keys(userInput).length > 0) {
            axios.post("/api/v1/posts", { ...userInput }, { headers }).then(res => {
                console.log(res);
                setIsLoading(false)
                if (res.data.success === true) {
                    setSuccess(true)
                }
            }).catch(err => {
                console.log(err);
            })
        }

    }, [userInput])

    const handleFileChange = (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0])
        setImageData(formData)
        console.log(`Image to be uploaded: ${formData}`);
    }

    const imageUploadHeaders = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
    }
    // console.log(token);

    const uploadImage = () => {
        return axios.post("/api/v1/posts/upload", imageData, { headers: imageUploadHeaders })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        setSuccess(false)
        const title = titleRef.current.value;
        const intro = introRef.current.value;
        const content = contentRef.current.value;
        // const image = imageRef.current.value;

        const tagString = tagsRef.current.value;
        const tags = tagString.split(",");

        const uploadRes = await uploadImage();
        console.log(uploadRes.data.imagePath);
        const image = uploadRes.data.imagePath
        // const image = 


        console.log(title, intro, content, image, tags);
        setUserInput({ title, intro, content, image, tags })

    }

    if (success) {
        return <PostCreated />;
    }


    return (
        <>


            <div className=" bg-gradient-to-l from-neutral-50 via-violet-600 to-slate-800 py-2 px-4 bg-center h-full  ">
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

                    <label className='text-xl text-[#EEEEEE]'>Image</label>
                    <input type="file" onChange={handleFileChange} className='rounded-lg text-2xl text-[#222831] font-semibold bg-[#EEEEEE] py-2 px-4 w-full' name="image" id="" />

                    {/* <input ref={imageRef} required className='rounded-lg text-2xl text-[#222831] font-semibold bg-[#EEEEEE] py-2 px-4 w-full' type="text" name="" id="image" /> */}
                    {isLoading ? <div className='text-center my-2 text-4xl'><Loader /></div> : <button className='my-4 w-1/4 mx-auto mb-10 bg-[#00ADB5] py-4 px-10 opacity-90 text-white text-2xl font-bold hover:opacity-100'>Create</button>}

                </form >
            </div >
        </>
    )
}

export default CreateBlogForm