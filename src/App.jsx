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
import { useEffect, useState } from "react";
import Movie from "./components/Movie";

const KEY = "cead7c1d";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

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

  useEffect(
    function () {
      const abortController = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError(null);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: abortController.signal }
          );

          if (!res.ok) throw new Error("Something went wrong fetching movies");

          const data = await res.json();

          if (data.Response === "False")
            throw new Error(`⛔ Movie "${query}" not found`);

          setMovies(data.Search);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setIsLoading(false);
        setMovies([]);
        setError(null);
        return;
      }
      closeMovie();
      fetchMovies();

      return function () {
        abortController.abort();
      };
    },
    [query]
  );

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
