# Explore Page Flow Checklist

<!-- 1. Discovery Posts (Grid View) -->

frontend/src/pages/Explore.jsx
  └── useEffect()
        └── axios.get('/posts/explore') → Discovery posts

backend/routers/post.routers.js
  └── router.get('/explore', auth, getExplorePosts)

backend/controllers/post.controller.js
  └── getExplorePosts()
        ├── Post.find() → retrieves discovery posts
        └── .sort({ createdAt: -1 }) → newest first

<!-- 2. User Search Functionality -->

frontend/src/pages/Explore.jsx
  └── useEffect([query])
        └── axios.get(`/users/search?q=${query}`) → Fuzzy search

backend/routers/user.routers.js
  └── router.get('/search', auth, searchUsers)

backend/controllers/user.controller.js
  └── searchUsers()
        ├── { username: { $regex: query, $options: 'i' } } → Fuzzy match
        └── res.json(users) → returns list of user profiles


<!-- 3. Dynamic Interactions -->

frontend/src/pages/Explore.jsx
  └── setResults(res.data) → displays search results dropdown
  └── setPosts(res.data) → populates exploration grid








User opens Explore page
↓
useEffect (Discovery) runs immediately
↓
GET /api/posts/explore hits backend
↓
Controller returns discovery post grid
↓
User types in search bar
↓
useEffect (Search) triggers debounced request
↓
GET /api/users/search hits backend
↓
MongoDB filter matches usernames
↓
Fuzzy search results sent to frontend
↓
Results dropdown appears under search bar
↓
User clicks result to visit profile
↓
User clicks post to open in modal
