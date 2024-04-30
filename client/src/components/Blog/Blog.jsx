/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import LazyLoad from "react-lazyload";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DeleteSuccessful from "../Action Response/DeleteSuccessful";
import axios from "axios";
import EditBlogForm from "../Blog Forms/EditBlogForm";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Blog = ({ id, title, intro, content, img, tags, isLoggedIn, author, createdAt }) => {
  const [isDeleteDrawerOpen, setIsDeleteDrawerOpen] = useState(false);
  const [username, setUsername] = useState('');
  const navigateTo = useNavigate();
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    axios.get(`/api/v1/profile/${author}`)
      .then(res => {
        setUsername(res.data.user.username);
      })
      .catch(err => console.log(err));
  }, [author]);

  const originalDate = new Date(createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = originalDate.toLocaleString("en-US", options);

  const handleDeleteClick = () => {
    setIsDeleteDrawerOpen(true);
  };

  const handleCloseDeleteDrawer = () => {
    setIsDeleteDrawerOpen(false);
  };

  const handleConfirmDelete = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios.delete(`/api/v1/posts/${id}`, { headers })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          navigateTo("/profile/deleted");
        }
        setIsDeleteDrawerOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setIsDeleteDrawerOpen(false);
      });
  };

  const handleEditClick = () => {
    navigateTo("/profile/edit", { state: { id, title, intro, content, img, tags } });
  };

  const handleImageClick = () => {
    navigateTo(`/blog/${id}`, { state: { username, formattedDate } });
  };

  return (
    <>
      <div className='flex items-center gap-5 justify-center mx-4 my-10'>
        <LazyLoad>
          <div className='flex flex-col items-center justify-center'>
            <img src={img} alt="" className='h-52 object-cover rounded-lg hover:cursor-pointer hover:scale-105 transition my-4' onClick={handleImageClick} />
            {isLoggedIn &&
              <div key={id} className="flex gap-4 my-1">
                <FaRegEdit onClick={handleEditClick} className='text-3xl hover:text-green-600 hover:cursor-pointer' />
                <MdDelete onClick={handleDeleteClick} className='text-3xl hover:text-red-500 hover:cursor-pointer' />
              </div>
            }
          </div>
        </LazyLoad>

        <div className="flex flex-col w-1/3">
          <p className='text-slate-800 text-center my-2'> {username} • {formattedDate}</p>
          <h1 className='text-2xl font-semibold text-center'>{title}</h1>

          <div className="flex  gap-2 flex-wrap justify-center">
            {tags && tags.map((tag, index) => <p key={index} className='text-sm font-semibold text-center my-1 min-w-20 bg-sky-400 text-slate-800 p-2 rounded-lg'>{tag}</p>)}
          </div>
          <p className='text-lg text-center my-4'>{intro}</p>
        </div>
        <hr className='bg-red-500' />
      </div>
      <hr className='bg-slate-700 h-2 shadow-md w-1/2' />
      <Drawer open={isDeleteDrawerOpen} onClose={handleCloseDeleteDrawer}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Delete Blog Post</DrawerTitle>
              <DrawerDescription>You can't recover this post once you delete it</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button onClick={handleConfirmDelete} className="bg-red-500">Delete</Button>
              <DrawerClose asChild>
                <Button onClick={handleCloseDeleteDrawer} variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Blog;
