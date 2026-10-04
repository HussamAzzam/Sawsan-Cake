import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowLeft } from "lucide-react"

// One list used by both the desktop and the mobile menu,
// so they can never get out of sync again
const adminLinks = [
  { to: "/admin/dashboard", label: "اللوحة الرئيسية" },
  { to: "/admin/products-management", label: "ادارة المنتجات" },
  { to: "/admin/gallery-management", label: "ادارة المعرض" },
];

export default function AdminNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const adminNavLinkStyle = ({ isActive }) =>
      `px-4 py-3 rounded-[10px] text-sm font-medium transition-colors ${
          isActive
              ? "bg-slate-800 text-white font-semibold shadow-sm"
              : "text-slate-300 hover:text-white hover:bg-slate-800/60"
      }`;

  const mobileNavLinkStyle = ({ isActive }) =>
      `block px-3 py-2 rounded-md text-base font-medium ${
          isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800/60"
      }`;

  return (
      <nav className="bg-slate-900 text-white shadow-md border-b border-slate-800 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-5 lg:px-10">
          <div className="flex justify-between items-center h-16">
            {/* Admin Brand */}
            <div className="flex items-center space-x-3">
              <Link
                  to="/admin/dashboard"
                  className="flex items-center space-x-2 text-lg font-bold tracking-tight text-white hover:text-pink-400 transition-colors"
              >
                <span>سوسن كيك <span className="text-xs bg-pink-600 text-white px-2 py-0.5 rounded-full ml-1 font-semibold uppercase tracking-wider">Admin</span></span>
              </Link>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-5 space-x-2">
              {adminLinks.map((link) => (
                  <NavLink key={link.to} to={link.to} className={adminNavLinkStyle}>
                    {link.label}
                  </NavLink>
              ))}
            </div>

            {/* Right Action - Back to Main Site */}
            <div className="hidden md:flex items-center space-x-3">
              <Link
                  to="/"
                  className="flex items-center justify-center
               gap-1.5 text-sm px-4 py-3 rounded-lg
               border border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-700
                hover:text-white transition-colors"
              >
                <span>عرض الموقع</span>
                <ArrowLeft size={15}/>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center">
              <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
                  aria-label="Toggle admin menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
            <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 pt-2 pb-4 space-y-1">
              {adminLinks.map((link) => (
                  <NavLink
                      key={link.to}
                      to={link.to}
                      className={mobileNavLinkStyle}
                      onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
              ))}

              <div className="pt-2 border-t border-slate-800">
                <Link
                    to="/"
                    className="flex items-center gap-1.5 px-3 py-2 text-sm text-pink-400 hover:text-pink-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>عرض الموقع</span>
                  <ArrowLeft size={15} />
                </Link>
              </div>
            </div>
        )}
      </nav>
  );
}