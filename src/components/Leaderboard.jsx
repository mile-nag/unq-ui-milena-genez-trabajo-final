const Leaderboard = ({ results }) => {
  if (results.length === 0) {
    return <p>Todavia no hay partidas guardadas</p>;
  }

  return (
    <div>
      <h2>Mejores puntajes</h2>
      <ol>
        {results.map((result) => (
          <li key={result.date} className="d-flex">
            <span>{result.alias}</span>
            <span>{result.score} puntos</span>
            <span>
              {result.wordCount} 
              {result.wordCount === 1 ? "palabra" : "palabras"}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;