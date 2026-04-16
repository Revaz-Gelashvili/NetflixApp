import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getMovieDetails } from "../../DataBase/tmdb.api";

export default function MovieDetail() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const loadMovie = async () => {
      const data = await getMovieDetails(movieId);
      setMovie(data);
    };
    loadMovie();
  }, [movieId]);

  if (!movie) return <div>Loading information about movie...</div>;
  return (
    <section className="min-h-screen bg-black">
      <p>{movie.title}</p>
    </section>
  );
}
