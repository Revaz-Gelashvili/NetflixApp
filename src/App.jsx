import { Routes, Route } from "react-router-dom";
import Page from "./Components/Page/Page.jsx";
import MovieDetail from "./Components/Page/MovieDetail.jsx";
import Header from "./Components/Header/Header.jsx";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/movie/:movieId" element={<MovieDetail />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </>
  );
}
