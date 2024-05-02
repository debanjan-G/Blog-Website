/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../Layout/Header";
import axios from "axios";

const BlogArticle = () => {
  const [post, setPost] = useState({});
  console.log(useLocation());
  const { username, formattedDate } = useLocation().state;
  const [likedUsers, setLikedUsers] = useState([]);
  const [liked, setLiked] = useState(false);
  const { id } = useParams();
  console.log({ id });

  useEffect(() => {
    axios
      .get(`/api/v1/posts/${id}`)
      .then((res) => {
        console.log(res);
        setPost(res.data.post);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLike = () => {
    // Send a POST request to the backend to like the post
    const token = localStorage.getItem("jwt");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`/api/v1/posts/${id}/like`, {}, { headers })
      .then((res) => {
        setLikedUsers([...likedUsers, res.data.userId]);
        console.log("Post liked successfully.");
        setLiked(!liked);
        // setLikedUsers(res.data.post.likedBy);
      })
      .catch((error) => {
        console.log("Error liking post:", error);
      });
  };
  const currentUserId = localStorage.getItem("userId");
  const isLikedByCurrentUser = likedUsers.includes(currentUserId);

  return (
    <>
      <Header />

      {/* {deleteFlag ? <DeleteSuccessful /> : ( */}
      <div className="text-center  flex flex-col items-center p-10 gap-10 titillium-web-regular">
        <h1 className="bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent text-6xl  text-center font-bold anton-regular">
          {post.title}
        </h1>
        <p>
          {" "}
          {username} • {formattedDate} • Likes:{post.likes}
        </p>
        <p className="text-2xl font-semibold">{post.intro}</p>
        <button onClick={handleLike}>
          {liked ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
              />
            </svg>
          )}
        </button>
        <img
          src={post.imageURL}
          className="h-96 rounded-lg object-cover"
          alt=""
        />
        <div className="max-w-full">
          <p
            className="text-left text-xl"
            style={{ whiteSpace: "pre-line", overflowWrap: "break-word" }}>
            {post.content}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
          {post.tags &&
            post.tags.map((tag, index) => (
              <p
                key={index}
                className="text-lg font-semibold text-center my-1 bg-sky-400 text-slate-800 p-3 rounded-lg">
                {tag}
              </p>
            ))}
        </div>
      </div>
    </>
  );
};

export default BlogArticle;
