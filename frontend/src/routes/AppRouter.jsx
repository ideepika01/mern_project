import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Profile from "../pages/Profile";
import Create from "../pages/Create";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Notifications from "../pages/Notifications";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRouter() {
  const profile = localStorage.getItem("profile");

  // Wrapper for protected pages
  const Private = (component) => (
    <ProtectedRoute>
      <MainLayout>{component}</MainLayout>
    </ProtectedRoute>
  );

  return (
    <Routes>
      <Route
        path="/login"
        element={profile ? <Navigate to="/home" /> : <Login />}
      />
      <Route
        path="/signup"
        element={profile ? <Navigate to="/home" /> : <Signup />}
      />

      <Route path="/" element={<Navigate to="/login" />} />

      {/* Protected routes */}
      <Route path="/home" element={Private(<Home />)} />
      <Route path="/explore" element={Private(<Explore />)} />
      <Route path="/create" element={Private(<Create />)} />
      <Route path="/notifications" element={Private(<Notifications />)} />
      <Route path="/profile/:username" element={Private(<Profile />)} />
      <Route path="/profile" element={Private(<Profile />)} />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default AppRouter;