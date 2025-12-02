const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>#️⃣ {watched.length} movies</p>
        <p>⭐️ {Math.round(avgImdbRating * 10) / 10}</p>
        <p>🌟 {Math.round(avgUserRating * 10) / 10}</p>
        <p>⏳ {Math.round(avgRuntime)} min</p>
      </div>
    </div>
  );
}
