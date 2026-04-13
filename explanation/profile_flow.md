# Profile Page Flow Checklist

<!-- 1. Profile Data & Post List -->

frontend/src/pages/Profile.jsx
  └── useEffect([username])
        └── getProfile()
              └── axios.get(`/users/profile/${username}`)

backend/routers/user.routers.js
  └── router.get('/profile/:username', auth, getUserProfile)

backend/controllers/user.controller.js
  └── getUserProfile()
        ├── User.findOne({ username }) → fetches user info
        ├── .select('-password') → hides sensitive data
        ├── .populate('saved') → retrieves saved posts
        ├── Post.find({ user: user._id }) → fetches user's posts
        └── res.json({ user, posts }) → returns combined data

<!-- 2. Profile Interactions (Follow/Edit) -->

frontend/src/pages/Profile.jsx
  └── handleFollow()
        └── axios.patch(`/users/follow/${userId}`)

backend/routers/user.routers.js
  └── router.patch('/follow/:userId', auth, followUser)

backend/controllers/user.controller.js
  └── followUser()
        ├── currentUser.following vs targetUser.followers
        └── toggles ID in respective arrays

<!-- 3. Profile Update -->

frontend/src/pages/Profile.jsx
  └── handleUpdate()
        └── axios.put('/users/update', data)

backend/routers/user.routers.js
  └── router.put('/update', auth, updateProfile)

backend/controllers/user.controller.js
  └── updateProfile()
        ├── User.findByIdAndUpdate(req.user.id)
        └── updates { username, bio, profilePic }









User navigates to /profile/:username
↓
useEffect (getProfile) runs on mount or URL change
↓
GET /api/users/profile/:username hits backend
↓
Controller queries User object (bio, stats, saved list)
↓
Controller queries Post collection for user's own posts
↓
Frontend receives Profile + Posts data
↓
User clicks "Follow" button
↓
PATCH /api/users/follow request updates relationships
↓
Follow/Following counts increment dynamically
↓
User clicks "Edit Profile"
↓
Dialog opens with existing data
↓
PUT /api/users/update sends new profile details
↓
LocalStorage updated with new data
↓
Profile re-fetches to show updated info
