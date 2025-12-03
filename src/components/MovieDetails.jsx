import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

const KEY = "cead7c1d";

export default function MovieDetails({
  watched,
  selectedId,
  onCloseMovie,
  onSetWatched,
}) {
  const [movieDetail, setMovieDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(null);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const userRating = isWatched
    ? watched.find((movie) => movie.imdbID === selectedId).userRating
    : null;

  function handleRating(rating) {
    setRating(rating);
    if (isWatched) {
      watched.find((movie) => movie.imdbID === selectedId).userRating = rating;
    }
  }

  function handleAdd() {
    onSetWatched({
      imdbID: movieDetail.imdbID,
      Title: movieDetail.Title,
      Year: movieDetail.Year,
      Poster: movieDetail.Poster,
      runtime: Number(movieDetail.Runtime.split(" ").at(0)),
      imdbRating: Number(movieDetail.imdbRating),
      userRating: rating ? rating : null,
    });
    onCloseMovie();
  }

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          onCloseMovie();
        }
      }

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseMovie]
  );

  useEffect(
    function () {
      async function fetchMovie() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovieDetail(data);
        setIsLoading(false);
      }
      fetchMovie();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!movieDetail.Title) return;
      document.title = `Movie | ${movieDetail.Title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [movieDetail]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader message="Getting your movie details..." />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={() => onCloseMovie()}>
              &lt;
            </button>
            <img
              src={movieDetail.Poster}
              alt={`Poster of ${movieDetail.Title}`}
            />
            <div className="details-overview">
              <h2>{movieDetail.Title}</h2>
              <p>
                {movieDetail.Year} &bull; {movieDetail.Runtime} &bull;{" "}
                {movieDetail.Genre}
              </p>
              <p>
                <span>⭐</span> {movieDetail.imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              <StarRating
                defaultRating={userRating}
                maxRating={10}
                starSize={22}
                onSetRating={handleRating}
              />
              {!isWatched && (
                <button className="btn-add" onClick={handleAdd}>
                  + Add to watched
                </button>
              )}
            </div>
            <p>
              <em>{movieDetail.Plot}</em>
            </p>
            <p>
              <strong>Actors:</strong> {movieDetail.Actors}
            </p>
            <p>
              <strong>Director:</strong> {movieDetail.Director}
            </p>
          </section>
        </>
      )}
    </div>
  );
}
