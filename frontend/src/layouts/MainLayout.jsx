import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import BottomNav from "../components/BottomNav";

function MainLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden bg-white">
      {/* Sidebar - Desktop Only */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      <div className="flex flex-col flex-1 h-screen overflow-hidden relative">
        <Navbar />
        {/* Main Content Area */}
        <main className="flex-1 w-full overflow-y-auto bg-gray-50/30 pb-20 md:pb-8">
          <div className="w-full px-0 md:px-0 py-0 md:py-4 mx-auto">
            {children}
          </div>
        </main>

        {/* Bottom Nav - Mobile Only */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}


export default MainLayout;


