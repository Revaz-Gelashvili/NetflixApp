import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Card({
  title,
  backdrop_path,
  release_date,
  vote_average,
  id,
}) {
  const [isFavourite, setIsFavourite] = useState(false);
  const fullImageUrl = `https://image.tmdb.org/t/p/w500${backdrop_path}`;
  return (
    <Link
      to={`/movie/${id}`}
      className="group block transform hover:scale-105 transition-transform duration-300"
    >
      <div
        className="relative w-38 sm:w-50 h-64 rounded-2xl overflow-hidden shadow-2xl"
        style={{
          backgroundImage: `url(${fullImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-90"></div>
        <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-transparent opacity-50"></div>

        <button
          className="p-4 shadow-2xl absolute right-0 z-10"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavourite(!isFavourite);
          }}
        >
          {isFavourite ? "❤️" : "🤍"}
        </button>

        <div className="absolute bottom-0 p-3 text-white w-full">
          <h3 className="font-bold text-lg leading-tight transition-all duration-300 group-hover:-translate-y-4 group-hover:scale-105 origin-left">
            {title}
          </h3>

          <div className="mt-2 flex justify-between items-center gap-2 transition-all duration-300 lg:opacity-0 group-hover:opacity-100 group-hover:-translate-y-2">
            <p className="text-xs text-gray-400">{release_date}</p>
            <span className="bg-yellow-500 text-black text-[10px] font-bold px-1.5 py-1.5 sm:px-3 sm:py-1 rounded-2xl text-center">
              IMDB: {vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
