import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Page from "./Components/Page/Page.jsx";
import MovieDetail from "./Components/Page/MovieDetail.jsx";
import Header from "./Components/Header/Header.jsx";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Header setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Page searchQuery={searchQuery} />} />
        <Route path="/movie/:movieId" element={<MovieDetail />} />
      </Routes>
    </>
  );
}
