import { useState } from "react";
import MovieList from "./MovieList";

export default function ListBox({ tempMovieData }) {
  const [movies, setMovies] = useState(tempMovieData);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && <MovieList movies={movies} />}
    </div>
  );
}
