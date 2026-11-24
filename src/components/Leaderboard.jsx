import { formatScore } from "../utils/format";

const Leaderboard = ({ results }) => {
  return (
    <div className="leaderboard sunken crt">
      <h2 className="leaderboard-title">Mejores puntajes</h2>

      {results.length === 0 ? (
        <p className="leaderboard-empty">Todavía no hay partidas guardadas.</p>
      ) : (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Alias</th>
              <th scope="col" className="text-end">Palabras</th>
              <th scope="col" className="text-end">Puntaje</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={result.date}>
                <td>{String(index + 1).padStart(2, "0")}</td>
                <td>{result.alias}</td>
                <td className="text-end">{result.wordCount}</td>
                <td className="text-end">{formatScore(result.score)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
