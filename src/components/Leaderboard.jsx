import { formatScore } from "../utils/format";

const formatPosition = (index) => String(index + 1).padStart(2, "0");

const ResultRow = ({ result, index }) => (
  <tr className={index === 0 ? "leaderboard-top" : ""}>
    <td>{formatPosition(index)}</td>
    <td>{result.alias}</td>
    <td className="text-end">{result.wordCount}</td>
    <td className="text-end">{formatScore(result.score)}</td>
  </tr>
);

const EmptyRow = ({ index }) => (
  <tr className="leaderboard-empty-row">
    <td>{formatPosition(index)}</td>
    <td>
      <span aria-hidden="true">---</span>
      <span className="visually-hidden">Puesto libre</span>
    </td>
    <td className="text-end" aria-hidden="true">
      ---
    </td>
    <td className="text-end" aria-hidden="true">
      ----
    </td>
  </tr>
);

const Leaderboard = ({ results, size }) => {
  const rows = Array.from( { length: size }, (_, index) => results[index] ?? null );

  return (
    <div className="leaderboard sunken crt">
      <h2 className="leaderboard-title">Mejores puntajes</h2>
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
          {rows.map((result, index) =>
            result ? (
              <ResultRow key={result.date} result={result} index={index} />
            ) : (
              <EmptyRow key={`empty-${index}`} result={result} index={index} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
