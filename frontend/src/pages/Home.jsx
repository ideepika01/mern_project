import React from "react";
import Stories from "../components/Stories";
import Post from "../components/Post";

// --- MOCK DATA ---
const STORIES = [
  { id: 1, name: "deepika", image: "https://img.freepik.com/free-photo/cascade-boat-clean-china-natural-rural_1417-1356.jpg" },
  { id: 2, name: "rehana", image: "https://img.freepik.com/free-photo/cascade-boat-clean-china-natural-rural_1417-1356.jpg" },
  { id: 3, name: "anu", image: "https://img.freepik.com/free-photo/cascade-boat-clean-china-natural-rural_1417-1356.jpg" },
  { id: 4, name: "narayan", image: "https://img.freepik.com/free-photo/cascade-boat-clean-china-natural-rural_1417-1356.jpg" },
  { id: 5, name: "aswin", image: "https://img.freepik.com/free-photo/cascade-boat-clean-china-natural-rural_1417-1356.jpg" },
];

const FEED_DATA = [
  {
    id: 1,
    user: "deepika_iyy",
    postImage: "https://img.freepik.com/free-photo/cascade-boat-clean-china-natural-rural_1417-1356.jpg",
    caption: "Capturing the serene moments of nature 🌿✨",
    likes: 1245,
    comments: 42,
    time: "2 HOURS AGO",
  },
  {
    id: 2,
    user: "adventure_seeker",
    postImage: "https://img.freepik.com/free-photo/cascade-boat-clean-china-natural-rural_1417-1356.jpg",
    caption: "Sunlight and Silence. Weekend getaway.",
    likes: 8500,
    comments: 156,
    time: "5 HOURS AGO",
  },
];

function Home() {
  return (
    <div className="flex flex-col items-center gap-8 py-4 px-2">
      {/* Stories */}
      <Stories stories={STORIES} />

      {/* Posts */}
      <div className="w-full max-w-[500px] flex flex-col gap-6">
        {FEED_DATA.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
