import { Link } from "react-router-dom";

export default function Header() {
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
              <li className="hover:text-white transition-colors cursor-pointer text-white">
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

        {/* ПРАВАЯ ЧАСТЬ: Поиск */}
        <div className="flex justify-end items-center">
          <input
            className="bg-black/20 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white focus:outline-none focus:border-red-600 sm:focus:w-80 transition-all duration-300 lg:w-60 sm:w-48 w-32"
            type="search"
            placeholder="Search..."
          />
        </div>
      </div>
    </header>
  );
}
