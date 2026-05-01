import React, { useEffect, useState } from "react";
import { db } from "../../DataBase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../Context/AuthContext";
import Card from "../Card/Card";
import backgroundVideo from "../../assets/bg-video.mp4";

export default function Wishlist() {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const [loadingData, setLoadingData] = useState(!!user);

  useEffect(() => {
    if (!user) return;

    const docRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setMovies(docSnap.data().wishlist || []);
        }
        setLoadingData(false);
      },
      () => {
        setLoadingData(false);
      },
    );

    return () => unsubscribe();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-xl font-medium px-4 text-center">
        Please sign in to your account to see your wishlist.
      </div>
    );
  }

  if (loadingData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setIsVideoLoaded(true)}
        className={`fixed top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
          isVideoLoaded ? "opacity-50" : "opacity-0"
        }`}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div className="relative z-10 pt-25 px-8">
        <h1 className="text-3xl text-center font-bold text-white mb-8 tracking-tight">
          My Wishlist
        </h1>

        {movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <p className="text-gray-400 text-lg text-center">
              This section is empty for now. Add something!
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-6 justify-center">
            {movies.map((movie) => (
              <Card
                key={movie.id}
                id={movie.id}
                title={movie.title}
                backdrop_path={movie.poster}
                release_date={movie.release_date || ""}
                vote_average={Number(movie.vote_average) || 0}
                initialIsFavourite={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
