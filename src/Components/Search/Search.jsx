export default function Search({ setSearchQuery }) {
  return (
    <input
      className="bg-black/20 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white focus:outline-none focus:border-red-600 md:focus:w-80 transition-all duration-300 lg:w-60 sm:w-48"
      type="search"
      placeholder="Search..."
      onChange={(e) => setSearchQuery(e.target.value)}
    ></input>
  );
}
