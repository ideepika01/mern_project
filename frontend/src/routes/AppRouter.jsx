import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Profile from "../pages/Profile";
import Messages from "../pages/Messages";
import Notifications from "../pages/Notifications";
import Create from "../pages/Create";


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
            <Route path="/notifications" element={
                <MainLayout>
                    <Notifications />
                </MainLayout>
            } />
            <Route path="/profile" element={
                <MainLayout>
                    <Profile />
                </MainLayout>
            } />
            <Route path="/messages" element={
                <MainLayout>
                    <Messages />
                </MainLayout>
            } />
            <Route path="/create" element={
                <MainLayout>
                    <Create />
                </MainLayout>
            } />
        </Routes>
    );
}


export default AppRouter;
