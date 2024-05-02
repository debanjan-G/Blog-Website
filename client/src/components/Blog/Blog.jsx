/* eslint-disable react/prop-types */
import LazyLoad from "react-lazyload";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";

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

const Blog = ({
  id,
  title,
  intro,
  content,
  img,
  tags,
  isLoggedIn,
  author,
  createdAt,
}) => {
  const [username, setUsername] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/v1/profile/${author}`)
      .then((res) => {
        setUsername(res.data.user.username);
      })
      .catch((err) => console.log(err));
  }, []);

  const originalDate = new Date(createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = originalDate.toLocaleString("en-US", options);

  const token = localStorage.getItem("jwt");
  const [isDeleteDrawerOpen, setIsDeleteDrawerOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteDrawerOpen(true);
  };

  const handleCloseDeleteDrawer = () => {
    setIsDeleteDrawerOpen(false);
  };

  const handleConfirmDelete = () => {
    //   axios.delete(`/api/v1/posts/${id}`, { headers }).then(res => {
    //     console.log(res);
    //     navigateTo("/profile", { state: { refetchPosts: true } })
    //   }).catch(err => console.log(err));
    // };
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
  };

  // const handleDeleteClick = () => {
  //   axios.delete(`/api/v1/posts/${id}`, { headers }).then(res => {
  //     console.log(res);
  //     navigateTo("/profile", { state: { refetchPosts: true } })
  //   }).catch(err => console.log(err));
  // };

  const handleImageClick = () => {
    console.log(username, formattedDate);
    navigateTo(`/blog/${id}`, { state: { username, formattedDate } });
  };

  return (
    <>
      <div className="flex items-center gap-5 justify-center mx-4 my-10">
        <LazyLoad>
          <div className="flex flex-col items-center justify-center">
            <img
              src={img}
              alt=""
              className="h-64 object-cover rounded-lg hover:cursor-pointer hover:scale-105 transition my-4"
              onClick={handleImageClick}
            />
            {isLoggedIn && (
              <div key={id} className="flex gap-4 my-1">
                <FaRegEdit
                  onClick={handleEditClick}
                  className="text-3xl hover:text-green-600 hover:cursor-pointer"
                />
                <MdDelete
                  onClick={handleDeleteClick}
                  className="text-3xl hover:text-red-500 hover:cursor-pointer"
                />
              </div>
            )}
          </div>
        </LazyLoad>

        <div className="flex flex-col w-1/2 ">
          <p className="text-slate-800 text-center my-2">
            {" "}
            {username} • {formattedDate}
          </p>
          <h1 className="text-2xl font-semibold text-left">{title}</h1>

          <div className="flex  gap-2 flex-wrap justify-center">
            {tags &&
              tags.map((tag, index) => (
                <p
                  key={index}
                  className="text-sm font-semibold text-center my-1 min-w-20 bg-sky-400 text-slate-800 p-2 rounded-lg">
                  {tag}
                </p>
              ))}
          </div>
          <p className="text-lg my-4 text-left">{intro}</p>
        </div>
      </div>
      <Drawer open={isDeleteDrawerOpen} onClose={handleCloseDeleteDrawer}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Delete Blog Post</DrawerTitle>
              <DrawerDescription>
                {"You can't recover this post once you delete it"}
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
