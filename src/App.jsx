import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Page from "./Components/Page/Page.jsx";
import MovieDetail from "./Components/Page/MovieDetail.jsx";
import Header from "./Components/Header/Header.jsx";
import SignIn from "./Components/Page/SignIn.jsx";
import Wishlist from "./Components/Page/Wishlist.jsx";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Header setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Page searchQuery={searchQuery} />} />
        <Route path="/movie/:movieId" element={<MovieDetail />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </>
  );
}
