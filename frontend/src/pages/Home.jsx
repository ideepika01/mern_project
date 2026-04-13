import React, { useEffect, useState } from "react";
import Stories from "../components/Stories";
import Post from "../components/Post";
import { fetchPosts } from "../api";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts().then(res => setPosts(res.data)).catch(console.error);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 py-4 px-2">
      <Stories />
      <div className="w-full max-w-[500px] flex flex-col gap-6">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
        {posts.length === 0 && <p className="text-center py-20 text-gray-400">No posts yet.</p>}
      </div>
    </div>
  );
}

export default Home;
