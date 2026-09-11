import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          {/* Brand info */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-lg font-bold text-pink-600 hover:text-pink-700 transition-colors"
            >
              <span>🍰</span>
              <span>Sawsan Cake</span>
            </Link>
            <p className="mt-2 text-sm text-gray-500 max-w-xs mx-auto md:mx-0">
              Freshly baked custom cakes, delightful desserts, and professional baking courses.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center md:justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-pink-600 transition-colors">
              Home
            </Link>
            <Link to="/menu" className="hover:text-pink-600 transition-colors">
              Menu
            </Link>
            <Link to="/courses" className="hover:text-pink-600 transition-colors">
              Courses
            </Link>
            <Link to="/about-us" className="hover:text-pink-600 transition-colors">
              About Us
            </Link>
            <Link to="/contact-us" className="hover:text-pink-600 transition-colors">
              Contact Us
            </Link>
          </div>

          {/* Copyright & Admin Link */}
          <div className="text-sm text-gray-400 md:text-right">
            <p>&copy; {new Date().getFullYear()} Sawsan Cake. All rights reserved.</p>
            <Link
              to="/admin"
              className="mt-1 inline-block text-xs text-gray-400 hover:text-pink-600 transition-colors"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
