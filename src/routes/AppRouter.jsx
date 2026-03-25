import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Profile from "../pages/Profile";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={
                <MainLayout>
                    <Home />
                </MainLayout>
            } />
            <Route path="/explore" element={
                <MainLayout>
                    <Explore />
                </MainLayout>
            } />
            <Route path="/profile" element={
                <MainLayout>
                    <Profile />
                </MainLayout>
            } />
            {/* Add more routes here, e.g., Messages */}
        </Routes>
    );
}

export default AppRouter;
