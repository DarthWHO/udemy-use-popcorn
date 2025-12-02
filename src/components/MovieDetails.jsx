import { useEffect, useState } from "react";
import StarRating from "./StarRating";

const KEY = "cead7c1d";

export default function MovieDetails({ selectedId, onCloseMovie }) {
  const [movieDetail, setMovieDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="details">
      <header>
        {" "}
        <button className="btn-back" onClick={() => onCloseMovie()}>
          &lt;
        </button>
        <img src={movieDetail.Poster} alt={`Poster of ${movieDetail.Title}`} />
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
          <StarRating maxRating={10} starSize={22} />
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
    </div>
  );
}
