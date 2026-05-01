import { Link, useNavigate } from "react-router-dom";
import Search from "../Search/Search";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Sidebar({ isOpen, setSearchQuery, toggleSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      if (toggleSidebar) toggleSidebar(); // Закрываем сайдбар после логаута
      navigate("/signin");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div
      className={`
      fixed top-0 left-0 h-screen w-64 bg-black/95 p-6 z-55 
      border-r border-white/10 shadow-2xl
      transition-transform duration-300 ease-in-out
      flex flex-col
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}
    >
      <nav className="flex flex-col gap-12 flex-1">
        <Link
          to="/"
          onClick={toggleSidebar}
          className="text-red-600 sm:text-2xl text-xl font-black uppercase shrink-0"
        >
          WishList.TV
        </Link>

        <ul className="flex flex-col gap-6 text-lg font-medium text-gray-300">
          <li className="hover:text-white transition-colors">
            <Link to="/" onClick={toggleSidebar}>
              Home
            </Link>
          </li>
          <li className="hover:text-white transition-colors">
            <Link to="/wishlist" onClick={toggleSidebar}>
              Wishlist
            </Link>
          </li>
          <li className="hover:text-white transition-colors">
            <Link to="/watched" onClick={toggleSidebar}>
              Watched
            </Link>
          </li>
          {!user && (
            <li className="text-white font-bold transition-colors">
              <Link to="/signin" onClick={toggleSidebar}>
                Sign In
              </Link>
            </li>
          )}
        </ul>

        <Search setSearchQuery={setSearchQuery} />
      </nav>

      {/* Секция аккаунта внизу сайдбара */}
      {user && (
        <div className="border-t border-white/10 pt-6 mt-auto">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest leading-none mb-2">
                Account
              </span>
              <span className="text-white text-sm font-medium truncate">
                {user.email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-3 rounded-xl transition-all duration-300 uppercase tracking-wider cursor-pointer"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
