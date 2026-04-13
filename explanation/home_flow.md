# Home Page Flow Checklist

<!-- 1. Data Fetching -->

frontend/src/pages/Home.jsx
  └── useEffect()
        └── axios.get('/posts') → imported from frontend/src/api/index.js

frontend/src/api/index.js
  └── axios = lib.create({ baseURL: '...' }) → Configured instance

<!-- 2. Backend Processing -->

backend/routers/post.routers.js
  └── router.get('/', auth, getPosts)

backend/controllers/post.controller.js
  └── getPosts()
        ├── Post.find() → retrieves latest posts
        ├── .populate('user', 'username profilePic') → fetches author details
        ├── .sort({ createdAt: -1 }) → newest first
        └── res.json(posts) → returns array of posts


<!-- 3. Frontend Rendering -->

frontend/src/pages/Home.jsx
  └── setPosts(res.data) → updates state with fetched posts
  └── posts.map()
        └── <Post key={post._id} post={post} /> → renders each post component








User opens Home page
↓
useEffect hook triggers automatically
↓
axios.get('/posts') API called

↓
Request hits Backend /api/posts
↓
Auth middleware verifies JWT
↓
Controller queries MongoDB for latest posts
↓
MongoDB populates User data (username, avatar)
↓
Data sent back to Frontend as JSON
↓
posts state is updated
↓
React re-renders the feed
↓
User sees the dynamic post list
