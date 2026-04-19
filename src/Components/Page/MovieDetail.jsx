import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getMovieDetails, getMovieVideos } from "../../DataBase/tmdb.api";

export default function MovieDetail() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const movieData = await getMovieDetails(movieId);
      const trailerData = await getMovieVideos(movieId);
      setMovie(movieData);
      setTrailer(trailerData);
    };
    loadData();
  }, [movieId]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-600"></div>
      </div>
    );
  }

  const formatCurrency = (num) => {
    return num > 0 ? `$${num.toLocaleString()}` : "N/A";
  };

  return (
    <section className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* --- ЗАДНИЙ ФОН --- */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/90 to-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full sm:w-2/3 md:w-80 shrink-0 mx-auto lg:mx-0">
            <div className="sticky top-28 shadow-2xl shadow-red-900/20">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-xl w-full border border-white/10 object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-8 w-full max-w-4xl">
            <div>
              <h1 className="text-5xl md:text-7xl font-black mb-3 uppercase tracking-tighter leading-none">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="text-xl md:text-2xl text-gray-400 font-light italic">
                  "{movie.tagline}"
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm font-bold">
              <span className="text-green-400 border border-green-500/30 bg-green-500/10 px-3 py-1 rounded">
                {Math.round(movie.vote_average * 10)}% Score
              </span>
              <span className="text-gray-300">
                {movie.release_date?.split("-")[0]}
              </span>
              <span className="text-gray-300">{movie.runtime} min</span>
              <div className="flex flex-wrap gap-2">
                {movie.genres?.map((g) => (
                  <span
                    key={g.id}
                    className="bg-white/10 px-3 py-1 rounded-full text-xs uppercase tracking-wider"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-2">
              <h3 className="text-sm font-black mb-3 text-red-600 uppercase tracking-[0.3em]">
                Overview
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg md:text-xl font-light">
                {movie.overview}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-white/10">
              <div>
                <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-2">
                  Status
                </p>
                <p className="text-sm font-semibold">{movie.status}</p>
              </div>
              <div>
                <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-2">
                  Language
                </p>
                <p className="text-sm font-semibold uppercase">
                  {movie.original_language}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-2">
                  Budget
                </p>
                <p className="text-sm font-semibold">
                  {formatCurrency(movie.budget)}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-2">
                  Revenue
                </p>
                <p className="text-sm font-semibold">
                  {formatCurrency(movie.revenue)}
                </p>
              </div>
            </div>

            {trailer && (
              <div className="mt-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-0.5 bg-red-600"></div>
                  <h3 className="text-sm font-black uppercase tracking-[0.3em]">
                    Official Trailer
                  </h3>
                </div>

                <div className="group relative pb-[56.25%] h-0 overflow-hidden rounded-2xl shadow-2xl border border-white/5 bg-white/5 transition-transform duration-500 hover:scale-[1.01]">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${trailer.key}?rel=0&showinfo=0`}
                    title="Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
