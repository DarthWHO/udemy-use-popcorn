import { useState, useEffect } from "react";

const KEY = "cead7c1d";

export function useMovies(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(
    function () {
      //   if (callback) callback();

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
      //   closeMovie();
      fetchMovies();

      return function () {
        abortController.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
