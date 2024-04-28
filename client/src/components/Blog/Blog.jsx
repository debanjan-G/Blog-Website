/* eslint-disable react/prop-types */
import React, { useState } from "react";
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

const Blog = ({ id, title, intro, content, img, tags, isLoggedIn }) => {
  const [isDeleteDrawerOpen, setIsDeleteDrawerOpen] = useState(false);
  const navigateTo = useNavigate();
  const token = localStorage.getItem("jwt");

  const handleDeleteClick = () => {
    setIsDeleteDrawerOpen(true);
  };

  const handleCloseDeleteDrawer = () => {
    setIsDeleteDrawerOpen(false);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`/api/v1/posts/${id}`, { headers })
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

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleEditClick = () => {
    // setToEdit(true)
    navigateTo("/profile/edit", {
      state: { id, title, intro, content, img, tags },
    });
    console.log("Editing blog...");
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/blog/${id}`);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-[30%] mx-4">
        <LazyLoad>
          <img
            src={img}
            alt=""
            className="h-52 hover:cursor-pointer hover:scale-105 transition my-4"
            onClick={handleClick}
          />
        </LazyLoad>
        {isLoggedIn && (
          <div key={id} className="flex gap-4 my-4">
            <FaRegEdit
              onClick={handleEditClick}
              className="text-4xl hover:text-green-600 hover:cursor-pointer"
            />
            <MdDelete
              onClick={handleDeleteClick}
              className="text-4xl hover:text-red-500 hover:cursor-pointer"
            />
          </div>
        )}
        <div className="flex gap-2 flex-wrap justify-center">
          {tags &&
            tags.map((tag, index) => (
              <p
                key={index}
                className="text-sm font-semibold text-center my-1 bg-sky-400 text-slate-800 p-2 rounded-lg">
                {tag}
              </p>
            ))}
        </div>
        {/* <p className='my-4 text-blue-600'>{tag}</p> */}
        <h1 className="text-2xl font-semibold text-center">{title}</h1>
        <p className="text-lg text-center my-4">{intro}</p>
      </div>
      <Drawer open={isDeleteDrawerOpen} onClose={handleCloseDeleteDrawer}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Delete Blog Post</DrawerTitle>
              <DrawerDescription>
                You can't recover this post once you delete it
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button onClick={handleConfirmDelete} className="bg-red-500">
                Delete
              </Button>
              <DrawerClose asChild>
                <Button onClick={handleCloseDeleteDrawer} variant="outline">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Blog;
