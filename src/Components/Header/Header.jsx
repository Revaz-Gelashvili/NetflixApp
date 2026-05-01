import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../SideBar/Sidebar";
import Menu from "../../assets/svg/menu.svg";
import Search from "../Search/Search";
import Close from "../../assets/svg/close.svg";
import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";

export default function Header({ setSearchQuery }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10 font-sans">
      <div className="max-w-360 mx-auto flex items-center h-16 px-8">
        <div className="flex items-center gap-8 text-nowrap">
          <Link
            to="/"
            className="text-red-600 sm:text-2xl text-xl font-black uppercase shrink-0 tracking-tighter"
          >
            WishList.TV
          </Link>

          <nav className="hidden md:block">
            <ul className="flex gap-6 text-sm font-medium text-gray-300 items-center">
              <li className="hover:text-white transition-colors cursor-pointer">
                <Link to="/">Home</Link>
              </li>

              {!user && (
                <li className="hover:text-white transition-colors cursor-pointer">
                  <Link to="/signin">Sign In</Link>
                </li>
              )}

              <li className="hover:text-white transition-colors cursor-pointer">
                <Link to="/wishlist">Wishlist</Link>
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                <Link to="/watched">Watched</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex-1"></div>

        <div className="flex gap-6 items-center">
          <div className="hidden md:block">
            <Search setSearchQuery={setSearchQuery} />
          </div>

          {user && (
            <div className="hidden md:flex items-center gap-4 border-l border-white/10 pl-6">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest leading-none mb-1">
                  Account
                </span>
                <span className="text-white text-xs font-medium">
                  {user.email}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-600/50 text-white text-[11px] font-bold py-1.5 px-3 rounded-lg transition-all duration-300 uppercase tracking-wider cursor-pointer"
              >
                Log out
              </button>
            </div>
          )}

          <div
            className="md:hidden cursor-pointer z-100 relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              src={isOpen ? Close : Menu}
              alt="Menu"
              className="w-8 transition-all duration-300"
            />
          </div>
        </div>
      </div>
      <Sidebar
        isOpen={isOpen}
        setSearchQuery={setSearchQuery}
        toggleSidebar={() => setIsOpen(false)}
      />
    </header>
  );
}
