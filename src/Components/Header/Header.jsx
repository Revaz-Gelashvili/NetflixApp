import { Link } from "react-router-dom";
import Sidebar from "../SideBar/Sidebar";
import Menu from "../../assets/svg/menu.svg";
import Search from "../Search/Search";
import Close from "../../assets/svg/close.svg";
import React, { useState } from "react";

export default function Header({ setSearchQuery }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-350 mx-auto flex items-center h-16 px-8">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-red-600 sm:text-2xl text-xl font-black uppercase shrink-0"
          >
            WishList.TV
          </Link>
          <nav className="hidden md:block">
            <ul className="flex gap-6 text-sm font-medium text-gray-300">
              <li className="hover:text-white transition-colors cursor-pointer">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Movies
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Wishlist
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Watched
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex-1"></div>

        <div className="flex gap-3 justify-between items-center">
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
          <div className="hidden md:block">
            <Search setSearchQuery={setSearchQuery} />
          </div>
        </div>
      </div>
      <Sidebar isOpen={isOpen} setSearchQuery={setSearchQuery} />
    </header>
  );
}
