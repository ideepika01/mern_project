# Home Page Flow Checklist

<!-- 1. Home page loads -->

frontend/src/pages/Home.jsx
  └── useEffect()
        └── loadPosts()
              ├── api.fetchPosts() → src/api/index.js
              └── GET /api/posts

backend/routers/post.routers.js
  └── router.get('/', getPosts)

backend/controllers/post.controller.js
  └── getPosts()
        ├── Post.find() → database query
        ├── .populate('user', 'username profilePic')
        ├── .sort({ createdAt: -1 })
        ├── .limit(10)
        └── returns Array of Posts (200)

frontend/src/pages/Home.jsx
  └── setPosts(data)
        └── render <Post /> components


<!-- 2. Post Interaction: Like -->

frontend/src/components/Post.jsx
  └── handleLikeAction()
        └── api.likePost(id) → src/api/index.js
              └── POST /api/posts/:id/like

backend/routers/post.routers.js
  └── router.post('/:id/like', auth, likePost)

backend/controllers/post.controller.js
  └── likePost()
        ├── find post by ID
        ├── check if likes.includes(userId)
        ├── if yes → remove (unlike)
        ├── if no → push (like)
        ├── post.save()
        └── returns Updated Post object (200)

frontend/src/components/Post.jsx
  └── setLikes(data.likes) → UI updates heart icon



User opens Home page
↓
React component loads
↓
useEffect triggers API
↓
GET /posts request sent
↓
Express router receives request
↓
Controller runs
↓
Service queries database
↓
MongoDB returns posts
↓
Controller sends JSON response
↓
Frontend stores posts in state
↓
React renders feed