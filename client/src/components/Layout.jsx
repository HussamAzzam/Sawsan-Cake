import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { PanelProvider } from "@/context/PanelContext";

export default function Layout() {
    const location = useLocation();
    const isHome = location.pathname === "/";

    return (
        <PanelProvider>
            <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
                <Navbar />
                <main className="flex-1">
                    <Outlet />
                </main>
                {!isHome && <Footer />}
            </div>
        </PanelProvider>
    );
}