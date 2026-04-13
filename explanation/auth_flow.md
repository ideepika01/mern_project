# Authentication Flow Checklist

<!-- 1. Signup Flow -->

frontend/src/pages/auth/Signup.jsx
  └── handleSubmit()
        └── api.register(data) → POST /api/auth/register

backend/routers/auth.routers.js
  └── router.post('/register', register)

backend/controllers/auth.controller.js
  └── register()
        ├── User.findOne() → check if exists
        ├── bcrypt.genSalt(10) → salt generation
        ├── bcrypt.hash(password) → encryption
        ├── User.create() → save account
        ├── jwt.sign({id}) → generate token
        └── returns { token } (201)

<!-- 2. Login Flow -->

frontend/src/pages/auth/Login.jsx
  └── handleSubmit()
        └── api.login(data) → POST /api/auth/login

backend/controllers/auth.controller.js
  └── login()
        ├── User.findOne({ email })
        ├── bcrypt.compare(pass, hash) → check password
        ├── jwt.sign({id}) → generate token
        └── returns { token, user } (200)

frontend/src/pages/auth/Login.jsx
  └── localStorage.setItem('profile', JSON.stringify(data))
  └── navigate("/home")
