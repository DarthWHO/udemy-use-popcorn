export default function MovieDetails({ selectedId, onSelectMovie }) {
  return (
    <div className="details">
      <section className="section">
        <button onClick={() => onSelectMovie("")}>{selectedId}</button>
      </section>
    </div>
  );
}
