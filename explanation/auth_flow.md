# Auth Page Flow Checklist (Login & Signup)

<!-- 1. User Registration (Signup) -->

frontend/src/pages/auth/Signup.jsx
  └── handleSubmit()
        └── axios.post('/auth/register', formData) → API call to /auth/register

backend/routers/auth.routers.js
  └── router.post('/register', register)

backend/controllers/auth.controller.js
  └── register()
        ├── User.findOne({ email, username }) → checks if user exists
        ├── bcrypt.hash(password, 10) → hashes password
        ├── User.create() → saves newUser to DB
        ├── generateToken(user._id) → creates JWT
        └── res.status(201).json({ token, user }) → returns session data

<!-- 2. User Authentication (Login) -->

frontend/src/pages/auth/Login.jsx
  └── handleSubmit()
        └── axios.post('/auth/login', formData) → API call to /auth/login

backend/routers/auth.routers.js
  └── router.post('/login', login)

backend/controllers/auth.controller.js
  └── login()
        ├── User.findOne({ email }) → finds user
        ├── bcrypt.compare(password, user.password) → validates password
        ├── generateToken(user._id) → creates JWT
        └── res.json({ token, user }) → returns user session


<!-- 3. Local Session Persistence -->

frontend/src/pages/auth/Login.jsx / Signup.jsx
  └── localStorage.setItem("profile", JSON.stringify(data)) → Persists session
  └── navigate("/home")








User enters /signup or /login
↓
Form data (email, password) is submitted
↓
POST /api/auth/register or login runs in backend
↓
Auth Controller hashes (Signup) or compares (Login)
↓
MongoDB returns user account or error
↓
JWT is signed with backend secret key
↓
Frontend receives success JSON (Token + User details)
↓
Data saved to Local Storage profile item
↓
Protected routes automatically unlock
↓
AppRouter navigates user to Home feed
↓
Axios interceptor attaches Token to all future headers
