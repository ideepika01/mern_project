import React, { useEffect, useState } from "react";
import Stories from "../components/Stories";
import Post from "../components/Post";
import { fetchPosts } from "../api";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to load all posts when the page opens
  const loadPosts = async () => {
    try {
      const response = await fetchPosts();
      setPosts(response.data);
    } catch (error) {
      console.error("Failed to load posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect runs once when the component mounts
  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 py-4 px-2">
      {/* 1. Top Section: Stories Bar */}
      <Stories />

      {/* 2. Main Section: List of Posts */}
      <div className="w-full max-w-[500px] flex flex-col gap-6">
        {loading ? (
          <p className="text-center py-10 text-gray-400">Loading home feed...</p>
        ) : (
          posts.map((singlePost) => (
            <Post 
              key={singlePost._id} 
              post={singlePost} 
            />
          ))
        )}
        
        {!loading && posts.length === 0 && (
          <p className="text-center py-10 text-gray-400">No posts available. Be the first to post!</p>
        )}
      </div>
    </div>
  );
}

export default Home;
