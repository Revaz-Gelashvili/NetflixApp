import React, { useEffect, useState } from "react";
import { getPopularMovies, searchMovies } from "../../DataBase/tmdb.api";
import Card from "../Card/Card.jsx";
import backgroundVideo from "../../assets/bg-video.mp4";
import { useAuth } from "../../Context/AuthContext.jsx";
import { db } from "../../DataBase/firebase.js";
import { doc, onSnapshot } from "firebase/firestore";

export default function Page({ searchQuery }) {
  const [movies, setMovies] = useState([]);
  const [favouriteIds, setFavouriteIds] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadingData = async () => {
      let data;
      if (searchQuery.trim()) {
        data = await searchMovies(searchQuery);
      } else {
        data = await getPopularMovies();
      }
      setMovies(data);
    };
    loadingData();
  }, [searchQuery]);

  useEffect(() => {
    if (!user) return;

    const userDocRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        const wishlist = doc.data().wishlist || [];
        const ids = wishlist.map((movie) => movie.id);
        setFavouriteIds(ids);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const displayMovies = movies.slice(0, 24);

  return (
    <section className="relative min-h-screen bg-black md:pt-14">
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

      <div className="relative z-20 pt-24 md:p-9 p-4">
        <div className="flex flex-wrap gap-6 justify-center">
          {displayMovies.map((item) => (
            <Card
              key={item.id}
              {...item}
              initialIsFavourite={favouriteIds.includes(item.id)}
            />
          ))}

          {movies.length === 0 && searchQuery && (
            <h2 className="text-white text-2xl mt-10">Фильмы не найдены</h2>
          )}
        </div>
      </div>
    </section>
  );
}
