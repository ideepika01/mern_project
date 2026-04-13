# Explore Page Flow Checklist

<!-- 1. Explore page loads -->

frontend/src/pages/Explore.jsx
  └── useEffect()
        └── api.fetchExplorePosts()
              └── GET /api/posts/explore

backend/routers/post.routers.js
  └── router.get('/explore', getExplorePosts)

backend/controllers/post.controller.js
  └── getExplorePosts()
        ├── Post.find()
        ├── .limit(10)
        └── returns Grid Posts (200)

<!-- 2. Search Functionality -->

frontend/src/pages/Explore.jsx → #search-input
  └── useEffect([query])
        └── searchUsers(query)
              └── GET /api/users/search?q=query

backend/routers/user.routers.js
  └── router.get('/search', auth, searchUsers)

backend/controllers/user.controller.js
  └── searchUsers()
        ├── User.find({ username: { $regex: query } })
        ├── .select('username profilePic bio')
        └── returns Search Results (200)

frontend/src/pages/Explore.jsx
  └── setResults(data)
        └── renders result cards with navigate(/profile/:username)
ke