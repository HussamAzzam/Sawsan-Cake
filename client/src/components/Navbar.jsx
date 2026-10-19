// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { usePanel } from "@/context/PanelContext";

import UserAvatar from "@/components/UserAvatar.jsx";

import { LayoutDashboard, Menu, X } from "lucide-react"

export default function Navbar() {
  const { user, isAdmin } = useAuth();
  const { activeIndex } = usePanel();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHomePage = location.pathname === "/";

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const isScrolled = isHomePage ? activeIndex > 0 || hasScrolled : true;

  const navLinkStyle = ({ isActive }) =>
      `px-3 py-2 rounded-md text-base transition-colors transition-all ease-in-out duration-100 ${
          isActive
              ? "active"
              : "font-medium  text-neutral hover:text-primary hover:bg-pink-50"
      }`;

  return (
      <nav className={`fixed top-0 lg:top-2 left-1/2 -translate-x-1/2 w-full lg:w-[80%] flex items-center justify-between
                     font-body transition-all ease-in-out duration-300  z-100
                     ${ isScrolled ? "bg-primary shadow-md" : "bg-transparent " } 
                     lg:rounded-md 
          `}>
        <div className=" lg:px-5 w-full">
          <div className="relative flex h-16 w-full">
            <div className={`lg:hidden w-full flex items-center justify-between px-5`}>
              <a
                  href={`/`}
                  className={`text-lg font-bold text-neutral font-heading`}
              >
                سوسن كيك
              </a>

              <div className={`flex items-center gap-4`}>
                {user && <UserAvatar user={user} size="w-8 h-8" />}
                <div onClick={() => setIsMobileMenuOpen(prev => !prev)}>
                  <Menu
                      size={24}
                      className={`text-neutral`}
                  />
                </div>
              </div>
            </div>

            <div className="hidden  lg:flex items-center w-full">
              <div className="hidden w-full md:flex  items-center justify-between  space-x-1 lg:space-x-4">
                <Link
                    to="/"
                    className="flex items-center space-x-2 text-xl font-bold font-heading text-neutral transition-colors mr-2 lg:mr-4"
                >
                  <span>سوسن كيك</span>
                </Link>

                <div className={`flex items-center gap-10 text-sm`}>
                  <NavLink to="/" className={navLinkStyle}>
                    الرئيسية
                  </NavLink>
                  <NavLink to="/menu" className={navLinkStyle}>
                    القائمة
                  </NavLink>
                  <NavLink to="/gallery" className={navLinkStyle}>
                    المعرض
                  </NavLink>
                  <NavLink to="/about-us" className={navLinkStyle}>
                    من نحن
                  </NavLink>
                  <NavLink to="/contact-us" className={navLinkStyle}>
                    تواصل معنا
                  </NavLink>
                </div>

                <div className="flex items-center z-10">
                  {user ? (
                      <div className="flex items-center gap-3">
                        {isAdmin && (
                            <Link
                                to="/admin/dashboard"
                                className="flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-md bg-transparent text-neutral border-2 border-neutral transition-colors"
                            >
                              <LayoutDashboard size={16} />
                              <span>لوحة التحكم</span>
                            </Link>
                        )}
                           <Link to="/profile"><UserAvatar user={user} size="w-9 h-9" /></Link>
                      </div>
                  ) : (
                      <Link
                          to={`/login`}
                          type="button"
                          className="btn"
                      >
                        سجل الان
                      </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
            <div
                dir="rtl"
                className="lg:hidden absolute left-0 top-0 w-full flex
                flex-row-reverse items-start justify-between border-t border-gray-100 bg-white
                px-4 pt-4 pb-4 space-y-1 text-right shadow-md"
            >
              <div
                onClick={() => setIsMobileMenuOpen(prev => !prev)}
              >
                <X
                    size={24}
                    className={`text-black`}
                />
              </div>
              <div className={`w-full flex flex-col items-start gap-2`}>
                <NavLink
                    to="/menu"
                    className={({ isActive }) =>
                        `block px-3 py-2 rounded-md text-base font-medium text-right transition-colors ${
                            isActive
                                ? "text-pink-600 bg-pink-50 font-semibold"
                                : "text-gray-700 hover:bg-gray-50"
                        }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                  القائمة
                </NavLink>
                <NavLink
                    to="/gallery"
                    className={({ isActive }) =>
                        `block px-3 py-2 rounded-md text-base font-medium text-right transition-colors ${
                            isActive
                                ? "text-pink-600 bg-pink-50 font-semibold"
                                : "text-gray-700 hover:bg-gray-50"
                        }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                  المعرض
                </NavLink>
                <NavLink
                    to="/about-us"
                    className={({ isActive }) =>
                        `block px-3 py-2 rounded-md text-base font-medium text-right transition-colors ${
                            isActive
                                ? "text-pink-600 bg-pink-50 font-semibold"
                                : "text-gray-700 hover:bg-gray-50"
                        }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                  من نحن
                </NavLink>
                <NavLink
                    to="/contact-us"
                    className={({ isActive }) =>
                        `block px-3 py-2 rounded-md text-base font-medium text-right transition-colors ${
                            isActive
                                ? "text-pink-600 bg-pink-50 font-semibold"
                                : "text-gray-700 hover:bg-gray-50"
                        }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                  تواصل معنا
                </NavLink>

                <div className="w-full pt-2 border-t border-gray-100">
                  {user ? (
                      isAdmin && (
                          <Link
                              to="/admin/dashboard"
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 text-base font-medium text-pink-600 hover:bg-pink-50 rounded-md transition-colors"
                          >
                            <LayoutDashboard size={18} />
                            <span>لوحة التحكم</span>
                          </Link>
                      )
                  ) : (
                      <Link
                          to={`/login`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="w-full text-right block px-3 py-2 text-base font-medium text-pink-600 hover:bg-pink-50 rounded-md cursor-pointer transition-colors"
                      >
                        تسجيل الدخول
                      </Link>
                  )}
                </div>
              </div>
            </div>
        )}
      </nav>
  );
}




