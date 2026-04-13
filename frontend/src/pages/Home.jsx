import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import axios from "../api";

function Home() {
  const [posts, setPosts] = useState([]);

  // Fetch all posts on initial load
  useEffect(() => {
    axios.get("/posts")
      .then((res) => setPosts(res.data))
      .catch(console.error);
  }, []);


  const handleDelete = (postId) => {
    setPosts((prev) => prev.filter((p) => p._id !== postId));
  };

  return (
    <div className="flex flex-col items-center gap-8 py-4 px-2">
      <div className="w-full max-w-[500px] flex flex-col gap-6">
        {posts.map((post) => (
          <Post key={post._id} post={post} onDelete={handleDelete} />
        ))}

        {/* Empty state */}
        {posts.length === 0 && (
          <p className="text-center py-20 text-gray-400">
            No posts yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;