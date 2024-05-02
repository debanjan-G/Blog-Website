/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Header from "../Layout/Header";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Blog from "../Blog/Blog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Profile = ({ statusCode }) => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { refetchPosts = false } = useLocation().state || {};

  const token = localStorage.getItem("jwt");
  const decoded = jwtDecode(token);
  console.log(decoded.id);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    axios
      .get(`/api/v1/profile/${decoded.id}/posts`)
      .then((res) => {
        // console.log(res);
        if (res.data.posts.length === 0) {
          setMessage(res.data.message);
        }
        setPosts([...res.data.posts]);
      })
      .catch((err) => console.log(err));
  }, [refetchPosts]);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };

  const handleDelete = () => {
    console.log("Deleting account...");
    axios
      .delete(`/api/v1/profile/${decoded.id}`, { headers })
      .then((res) => {
        console.log(res);
        localStorage.removeItem("jwt");
        navigate("/account-deleted");
      })
      .catch((err) => console.log(err));
  };

  console.log(decoded);

  const handleDeleteConfirmation = () => {
    handleDelete();
  };

  let welcomeMsg =
    "Welcome back! 🌟 You're all set to dive into the latest posts and discussions. Enjoy your stay!";

  if (statusCode === 201) {
    // Registered
    welcomeMsg =
      "Congratulations! 🎉 You're officially part of our blog community. Let the reading adventures begin!";
  }

  const { username, email, dp } = decoded;

  return (
    <div className="pb-10">
      <div className="flex justify-between items-center m-2 ">
        <Header />
        <div className="flex gap-4">
          <button
            className="bg-slate-900 h-full py-3 px-10 opacity-90 text-white font-bold hover:opacity-100"
            onClick={handleLogout}>
            Logout
          </button>
          <Dialog>
            <DialogTrigger asChild>
              <button className="bg-red-600 text-slate-100 font-semibold py-3 px-10 rounded-lg hover:bg-red-500">
                Delete Account
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Delete profile</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                {"Your account can't be recovered once you delete it"}
              </DialogDescription>
              <DialogFooter>
                <DialogClose>
                  <Button type="cancel" className="bg-gray-400">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="bg-red-600 hover:bg-red-900"
                  onClick={handleDeleteConfirmation}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className=" flex flex-col items-center h-screen w-1/2 mx-auto justify-center">
        <h1 className="text-7xl text-slate-800  text-center font-bold my-6 anton-regular ">
          {username}
        </h1>
        <p className="text-slate-600 rounded-md">{email}</p>
        {/* {!posts.length > 0 && */}
        {/* <> */}
        <img
          src={dp}
          alt="DP"
          className="object-cover h-52 my-5 rounded-full"
        />
        <p className="text-slate-700 text-2xl text-center">{welcomeMsg}</p>

        {/* </> */}
        {/* } */}
        {posts.length > 0 ? (
          <p className="text-slate-600 border-2 p-4 my-4 shadow-lg rounded-md">
            Blogs written: {posts.length}
          </p>
        ) : (
          <p className="text-slate-600 border-2 p-4 my-4 shadow-lg rounded-md">
            {message}
          </p>
        )}

        <button
          className="bg-slate-900 py-4 px-10 opacity-90 text-white font-bold hover:opacity-100 my-4 text-lg"
          onClick={() => {
            navigate("/create-blog");
          }}>
          Compose New Blog
        </button>
      </div>

      {posts.length > 0 && (
        <div>
          <h1 className="text-5xl anton-regular text-center px-4 my-4">
            YOUR POSTS
          </h1>
          <div className="blogs flex flex-col justify-center">
            {posts.map((post) => (
              <Blog
                key={post._id}
                id={post._id}
                title={post.title}
                intro={post.intro}
                content={post.content}
                tags={post.tags}
                img={post.imageURL}
                author={post.author}
                createdAt={post.createdAt}
                isLoggedIn={true}
                likes={post.likes}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
