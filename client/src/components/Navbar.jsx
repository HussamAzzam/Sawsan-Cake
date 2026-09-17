import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { usePanel } from "@/context/PanelContext";

export default function Navbar() {
  const { user, loginWithGoogle, logout } = useAuth();
  const { activeIndex } = usePanel();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHomePage = location.pathname === "/";

  // Only use scroll-based logic on the home page; everywhere else, always primary
  const isScrolled = isHomePage ? activeIndex > 0 : true;

  const navLinkStyle = ({ isActive }) =>
      `px-3 py-2 rounded-md text-base transition-colors transition-all ease-in-out duration-100 ${
          isActive
              ? "active"
              : "font-medium  text-neutral hover:text-primary hover:bg-pink-50"
      }`;

  return (
      <nav className={`fixed top-2 left-1/2 -translate-x-1/2 w-[80%] flex items-center justify-between
                     font-body transition-all ease-in-out duration-300  z-100
                     ${ isScrolled ? "bg-primary shadow-md" : "bg-transparent " } 
                     rounded-md 
          `}>
        <div className=" px-4 sm:px-6 lg:px-5 w-full">
          <div className="relative flex h-16 w-full">
            {/* Mobile version */}
            <div className={`md:hidden flex flex-row-reverse w-full items-center justify-between `}>
              <div className={`flex w-100 items-center justify-end`}>
                {/* Brand Logo - Centered on Mobile */}
                <div className="md:hidden flex items-center">
                  <Link
                      to="/"
                      className="flex items-center space-x-2 text-lg font-bold text-neutral transition-colors font-heading"
                  >
                    <span>سوسن كيك</span>
                  </Link>
                </div>
                {/* Mobile Hamburger Button */}
                <div className="flex md:hidden items-center">
                  <button
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      type="button"
                      className="inline-flex items-center justify-center p-2 rounded-md text-neutral hover:text-pink-600 hover:bg-pink-50 focus:outline-none cursor-pointer"
                      aria-label="Toggle menu"
                  >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                      {isMobileMenuOpen ? (
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                          />
                      ) : (
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 6h16M4 12h16M4 18h16"
                          />
                      )}
                    </svg>
                  </button>

                </div>
              </div>

              {/* Top Left: Sign In / User Button (mobile) */}
              <div className="flex items-center z-10 w-40">
                {user ? (
                    <div className="flex items-center gap-2">
                      {user.avatar && (
                          <img
                              src={user.avatar}
                              alt={user.name || "User"}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-pink-200 object-cover"
                          />
                      )}
                      <span className="hidden sm:inline text-xs font-medium text-gray-700">
                  {user.name}
                </span>
                      <button
                          onClick={logout}
                          type="button"
                          className="text-sm font-bold px-3 py-1.5  rounded-md bg-transparent text-neutral border-2 border-neutral  transition-colors cursor-pointer"
                      >
                        تسجيل الخروج
                      </button>
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="btn"
                    >
                      سجل الان
                    </Link>
                )}
              </div>
            </div>

            {/* Top Right: Desktop Navigation + Desktop Logo, or Mobile Hamburger */}
            <div className="flex items-center w-full">
              {/* Desktop Navigation Links + Brand Logo */}
              <div className="hidden w-full md:flex items-center justify-between  space-x-1 lg:space-x-4">
                <Link
                    to="/"
                    className="flex items-center space-x-2 text-xl font-bold font-heading text-neutral transition-colors mr-2 lg:mr-4"
                >
                  <span>سوسن كيك</span>
                </Link>

                <div className={`flex items-center gap-10 text-sm`}>
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

                {/* Top Left: Sign In / User Button (Desktop) */}
                <div className="flex items-center z-10">
                  {user ? (
                      <div className="flex items-center gap-2">
                        {user.avatar && (
                            <img
                                src={user.avatar}
                                alt={user.name || "User"}
                                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-pink-200 object-cover"
                            />
                        )}
                        <span className="hidden sm:inline text-xs font-medium text-gray-700">
                  {user.name}
                </span>
                        <button
                            onClick={logout}
                            type="button"
                            className="text-sm font-bold px-3 py-1.5  rounded-md bg-transparent text-neutral border-2 border-neutral  transition-colors cursor-pointer"
                        >
                          تسجيل الخروج
                        </button>
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
            <div
                dir="rtl"
                className="md:hidden border-t border-gray-100 bg-white px-4 pt-2 pb-4 space-y-1 text-right"
            >
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

              {/* Mobile Auth Button */}
              <div className="pt-2 border-t border-gray-100">
                {user ? (
                    <div className="flex items-center justify-between px-3 py-2">
                      <div className="flex items-center gap-2">
                        {user.avatar && (
                            <img
                                src={user.avatar}
                                alt={user.name || "User"}
                                className="w-7 h-7 rounded-full border border-pink-200 object-cover"
                            />
                        )}
                        <span className="text-sm font-medium text-gray-700">{user.name}</span>
                      </div>
                      <button
                          onClick={() => {
                            logout();
                            setIsMobileMenuOpen(false);
                          }}
                          type="button"
                          className="text-xs text-pink-600 hover:underline cursor-pointer"
                      >
                        تسجيل الخروج
                      </button>
                    </div>
                ) : (
                    <button
                        onClick={() => {
                          loginWithGoogle();
                          setIsMobileMenuOpen(false);
                        }}
                        type="button"
                        className="w-full text-right block px-3 py-2 text-base font-medium text-pink-600 hover:bg-pink-50 rounded-md cursor-pointer transition-colors"
                    >
                      تسجيل الدخول
                    </button>
                )}
              </div>
            </div>
        )}
      </nav>
  );
}