import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Main from "./components/Main";
import ListBox from "./components/ListBox";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedList from "./components/WatchedList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";
import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useMovies } from "./useMovies";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [watched, setWatched] = useLocalStorage([], "watched");
  const { movies, isLoading, error } = useMovies(query);

  function selectMovie(id) {
    id === selectedId ? setSelectedId("") : setSelectedId(id);
  }

  function closeMovie() {
    setSelectedId("");
  }

  function handleAddWatchedMovie(movie) {
    setWatched([...watched, movie]);
  }

  function handleDeleteWatchedMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Navigation>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navigation>
      <Main>
        <ListBox>
          {movies.length === 0 && (
            <Loader message="Start typing to search for movies..." />
          )}
          {isLoading && !error && <Loader message="Loading..." />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={selectMovie} />
          )}
          {!isLoading && error && <ErrorMessage message={error} />}
        </ListBox>
        <ListBox>
          {selectedId && (
            <MovieDetails
              watched={watched}
              selectedId={selectedId}
              onCloseMovie={closeMovie}
              onSetWatched={handleAddWatchedMovie}
            />
          )}
          {!selectedId && <WatchedSummary watched={watched} />}
          {!selectedId && (
            <WatchedList
              watched={watched}
              onSelectMovie={selectMovie}
              onDeleteWatched={handleDeleteWatchedMovie}
            />
          )}
        </ListBox>
      </Main>
    </>
  );
}
