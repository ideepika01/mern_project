import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <div className="flex w-full h-screen overflow-hidden bg-white">
      {/* Sidebar - should have fixed width defined within it or here */}
      <Sidebar />
      
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <Navbar />
        {/* Main Content Area */}
        <main className="flex-1 w-full overflow-y-auto bg-gray-50/30">
          <div className="w-full max-w-5xl px-4 py-8 mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainLayout;


