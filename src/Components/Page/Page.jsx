import React, { useEffect, useState } from "react";
import { getPopularMovies } from "../../DataBase/tmdb.api";
import Card from "../Card/Card.jsx";
import backgroundVideo from "../../assets/bg-video.mp4";

export default function MainPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadingData = async () => {
      const data = await getPopularMovies();
      setMovies(data);
    };
    loadingData();
  }, []);

  return (
    <section className="relative min-h-screen bg-black">
      {/* ВИДЕО-ФОН (Fixed - всегда на весь экран) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div className="fixed inset-0 bg-black/60 z-10 pointer-events-none"></div>

      <div className="relative z-20 p-9 pt-24">
        <div className="flex flex-wrap gap-6 justify-center">
          {movies.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              overview={item.overview}
              backdrop_path={item.backdrop_path}
              release_date={item.release_date}
              vote_average={item.vote_average}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
