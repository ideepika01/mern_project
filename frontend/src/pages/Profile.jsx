import React, { useEffect, useState } from "react";
import {
  Avatar, Button, IconButton, Dialog,
  DialogTitle, DialogContent, TextField, DialogActions
} from "@mui/material";
import {
  SettingsOutlined as SettingsIcon,
  GridOnOutlined as GridIcon,
  BookmarkBorderOutlined as BookmarkIcon,
  Close as CloseIcon
} from "@mui/icons-material";
import Post from "../components/Post";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api";

const Tab = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-2 py-4 border-t ${active ? "border-black text-black" : "border-transparent text-gray-400"
      } cursor-pointer text-xs font-bold`}
  >
    {icon} {label}
  </div>
);

function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [viewIndex, setViewIndex] = useState(null);

  const [activeTab, setActiveTab] = useState("posts");
  const [isFollowing, setIsFollowing] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [editBio, setEditBio] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editPic, setEditPic] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("profile"))?.user;
  const currentUsername = username || currentUser?.username;

  // Fetch profile data
  const getProfile = () => {
    axios.get(`/users/profile/${currentUsername}`)
      .then((res) => {
        const data = res.data;

        setUser(data.user);
        setPosts(data.posts);

        setEditBio(data.user.bio || "");
        setEditUsername(data.user.username);
        setEditPic(data.user.profilePic || "");

        setIsFollowing(
          data.user.followers?.includes(currentUser.id)
        );
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (!username && currentUser?.username) {
      navigate(`/profile/${currentUser.username}`, { replace: true });
      return;
    }

    getProfile();
  }, [username]);

  // Follow / unfollow user
  const handleFollow = () => {
    axios.patch(`/users/follow/${user._id}`)
      .then((res) => {
        const data = res.data;

        setIsFollowing(data.isFollowing);

        const updatedFollowers = data.isFollowing
          ? [...user.followers, currentUser.id]
          : user.followers.filter(
            (id) => id !== currentUser.id
          );

        setUser({ ...user, followers: updatedFollowers });
      })
      .catch(console.error);
  };

  // Update profile
  const handleUpdate = () => {
    axios.put('/users/update', {
      bio: editBio,
      username: editUsername,
      profilePic: editPic
    })

      .then((res) => {
        const data = res.data;

        setOpenEdit(false);

        const profile = JSON.parse(localStorage.getItem("profile"));
        profile.user = {
          ...profile.user,
          username: data.username,
          bio: data.bio,
          profilePic: data.profilePic
        };

        localStorage.setItem("profile", JSON.stringify(profile));

        getProfile();

        if (editUsername !== user.username) {
          navigate(`/profile/${editUsername}`);
        }

        // Not ideal, but kept for now
        window.location.reload();
      })
      .catch((e) => alert(e.message));
  };

  const handleDelete = (postId) => {
    setPosts((prev) => prev.filter((p) => p._id !== postId));
    setViewIndex(null); // Close modal
  };

  if (!user) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  const isOwn = user.username === currentUser?.username;

  const displayedPosts =
    activeTab === "posts" ? posts : user.saved || [];

  return (
    <div className="max-w-4xl mx-auto py-6">

      {/* Header */}
      <div className="flex gap-10 mb-8 px-4">
        <Avatar src={user.profilePic} className="w-28 h-28" />

        <div>
          <div className="flex items-center gap-4">
            <h2>{user.username}</h2>

            {isOwn ? (
              <Button onClick={() => setOpenEdit(true)}>
                Edit Profile
              </Button>
            ) : (
              <Button onClick={handleFollow}>
                {isFollowing ? "Following" : "Follow"}
              </Button>
            )}

            <IconButton>
              <SettingsIcon />
            </IconButton>
          </div>

          <div className="flex gap-6 my-2 text-sm">
            <span>{posts.length} posts</span>
            <span>{user.followers?.length || 0} followers</span>
            <span>{user.following?.length || 0} following</span>
          </div>

          <p>{user.bio || "No bio"}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-10 border-t">
        <Tab
          icon={<GridIcon fontSize="small" />}
          label="Posts"
          active={activeTab === "posts"}
          onClick={() => setActiveTab("posts")}
        />

        {isOwn && (
          <Tab
            icon={<BookmarkIcon fontSize="small" />}
            label="Saved"
            active={activeTab === "saved"}
            onClick={() => setActiveTab("saved")}
          />
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-1 mt-2">
        {displayedPosts.map((p, i) => (
          <img
            key={p._id}
            src={
              p.image?.startsWith("http")
                ? p.image
                : `http://localhost:5001${p.image}`
            }
            onClick={() => setViewIndex(i)}
            className="aspect-square object-cover cursor-pointer"
          />
        ))}
      </div>

      {/* Modal */}
      {viewIndex !== null && (
        <div className="fixed inset-0 bg-black/90 flex justify-center">
          <IconButton
            onClick={() => setViewIndex(null)}
            className="absolute top-4 right-4 text-white"
          >
            <CloseIcon />
          </IconButton>

          <div className="max-w-[500px] w-full">
            <Post post={displayedPosts[viewIndex]} onDelete={handleDelete} />
          </div>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Profile</DialogTitle>

        <DialogContent className="flex flex-col gap-3">
          <TextField
            label="Username"
            value={editUsername}
            onChange={(e) => setEditUsername(e.target.value)}
          />
          <TextField
            label="Profile Pic"
            value={editPic}
            onChange={(e) => setEditPic(e.target.value)}
          />
          <TextField
            label="Bio"
            multiline
            rows={3}
            value={editBio}
            onChange={(e) => setEditBio(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleUpdate}>Save</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default Profile;