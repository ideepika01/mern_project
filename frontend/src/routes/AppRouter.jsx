import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Profile from "../pages/Profile";
import Create from "../pages/Create";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Messages from "../pages/Messages";

import ProtectedRoute from "../components/ProtectedRoute";

function AppRouter() {
    const profile = localStorage.getItem('profile');

    return (
        <Routes>
            <Route path="/login" element={profile ? <Navigate to="/home" /> : <Login />} />
            <Route path="/signup" element={profile ? <Navigate to="/home" /> : <Signup />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/home" element={
                <ProtectedRoute>
                    <MainLayout><Home /></MainLayout>
                </ProtectedRoute>
            } />
            <Route path="/explore" element={
                <ProtectedRoute>
                    <MainLayout><Explore /></MainLayout>
                </ProtectedRoute>
            } />
            <Route path="/create" element={
                <ProtectedRoute>
                    <MainLayout><Create /></MainLayout>
                </ProtectedRoute>
            } />
            <Route path="/messages" element={
                <ProtectedRoute>
                    <MainLayout><Messages /></MainLayout>
                </ProtectedRoute>
            } />
            <Route path="/profile/:username" element={
                <ProtectedRoute>
                    <MainLayout><Profile /></MainLayout>
                </ProtectedRoute>
            } />
            <Route path="/profile" element={
                <ProtectedRoute>
                    <MainLayout><Profile /></MainLayout>
                </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    );
}



export default AppRouter;
