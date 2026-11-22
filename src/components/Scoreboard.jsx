const Scoreboard = ({ score, wordCount }) => {
  <div className="d-flex gap-4 text-center">
    <div>
      <p>Puntos</p>
      <div className="fs-2 fw-bold">{score}</div>
    </div>
    <div>
      <p>Palabras</p>
      <div className="fs-2 fw-bold">{wordCount}</div>
    </div>
  </div>;
};

export default Scoreboard;
