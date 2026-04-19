import { Link } from "react-router-dom";
import Search from "../Search/Search";

export default function Sidebar({ isOpen, setSearchQuery }) {
  return (
    <div
      className={`
      fixed top-0 left-0 h-screen w-64 bg-black/95 p-6 z-55 
      border-r border-white/10 shadow-2xl
      transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}
    >
      <nav className="flex flex-col gap-15">
        <Link
          to="/"
          className="text-red-600 sm:text-2xl text-xl font-black uppercase shrink-0"
        >
          WishList.TV
        </Link>

        <ul className="flex flex-col gap-6 text-lg font-medium text-gray-300">
          <li className="hover:text-white transition-colors">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-white transition-colors">Movies</li>
          <li className="hover:text-white transition-colors">Wishlist</li>
          <li className="hover:text-white transition-colors">Watched</li>
        </ul>

        <Search setSearchQuery={setSearchQuery} />
      </nav>
    </div>
  );
}
