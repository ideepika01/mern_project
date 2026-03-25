import react from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

function MainLayout({ children }) {
    return (
        <div className="MainLayout">
            <Sidebar />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {children}
                </div>
            </div>
        </div>
    )
}
export default MainLayout