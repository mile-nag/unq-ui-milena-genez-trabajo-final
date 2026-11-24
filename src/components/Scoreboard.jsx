const formatScore = (value) => String(value).padStart(4, "0");

const Scoreboard = ({ score, wordCount, bestScore }) => {
  return (
    <dl className="scoreboard sunken crt">
      <div className="scoreboard-item">
        <dt>Récord</dt>
        <dd>{formatScore(bestScore)}</dd>
      </div>
      <div className="scoreboard-item">
        <dt>Puntos</dt>
        <dd>{formatScore(score)}</dd>
      </div>
      <div className="scoreboard-item">
        <dt>Palabras</dt>
        <dd>{wordCount}</dd>
      </div>
    </dl>
  );
};

export default Scoreboard;
