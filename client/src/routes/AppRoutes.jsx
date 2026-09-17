import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import AdminLayout from "../components/AdminLayout";

// User Pages
import Home from "../pages/user/home/Home";
import AboutUs from "../pages/user/about-us/AboutUs";
import ContactUs from "../pages/user/contact-us/ContactUs";
import Gallery from "../pages/user/gallery/Gallery";
import Menu from "../pages/user/menu/Menu";
import LoginPage from "../pages/user/login/LoginPage";

// Admin Pages
import Dashboard from "../pages/admin/dashboard/Dashboard";
import MenuManager from "../pages/admin/menu-manager/MenuManager";
import Content from "../pages/admin/content/Content";

// Fallback Page
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Standalone Auth Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* User Routes with User Layout (Navbar & Footer) */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/about" element={<Navigate to="/about-us" replace />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/contact" element={<Navigate to="/contact-us" replace />} />
        {/* 404 Catch-all within user layout */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin Routes with Admin Layout (AdminNavbar only, no Footer) */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/menu-manager" element={<MenuManager />} />
        <Route path="/admin/menu" element={<Navigate to="/admin/menu-manager" replace />} />
        <Route path="/admin/content" element={<Content />} />
      </Route>
    </Routes>
  );
}
