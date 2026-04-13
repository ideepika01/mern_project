# Create Post Page Flow Checklist

<!-- 1. Selection & Preview -->

frontend/src/pages/Create.jsx
  └── handleFileSelect()
        ├── input.files[0] → gets image file
        └── URL.createObjectURL(file) → #preview-img

<!-- 2. Form Submission (Multipart/FormData) -->

frontend/src/pages/Create.jsx → #ShareButton
  └── handleShare()
        ├── new FormData()
        ├── formData.append("image", file)
        ├── formData.append("caption", caption)
        └── axios.post('/posts', formData)

backend/routers/post.routers.js
  └── router.post('/', auth, upload.single('image'), createPost)
         └── upload.single('image') → backend/helpers/upload.js (Multer)
               └── Saves file to /uploads/ folder

backend/controllers/post.controller.js
  └── createPost()
        ├── req.file.filename → constructs local URL
        ├── Post.create()     → save to DB
        └── returns New Post object (201)


frontend/src/pages/Create.jsx
  └── navigate("/home") → User sees their new post







User opens Create page
↓
User selects image + caption
↓
handleSubmit runs
↓
FormData created
↓
POST request sent to /posts
↓
Express router receives request
↓
multer middleware saves image
↓
Controller reads caption + file path
↓
Service inserts post into database
↓
MongoDB stores post
↓
Response returned to frontend
↓
Feed refreshes with new post