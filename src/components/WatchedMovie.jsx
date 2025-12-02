export default function WatchedMovie({
  movie,
  onSelectMovie,
  onDeleteWatched,
}) {
  return (
    <li>
      <img
        src={movie.Poster}
        alt={`${movie.Title} poster`}
        onClick={() => onSelectMovie(movie.imdbID)}
      />
      <h3 onClick={() => onSelectMovie(movie.imdbID)}>{movie.Title}</h3>
      <div onClick={() => onSelectMovie(movie.imdbID)}>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
      <button
        className="btn-delete"
        onClick={() => onDeleteWatched(movie.imdbID)}
      >
        X
      </button>
    </li>
  );
}
