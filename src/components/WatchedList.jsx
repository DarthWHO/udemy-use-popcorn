import WatchedMovie from "./WatchedMovie.jsx";

export default function WatchedList({ watched, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
}
