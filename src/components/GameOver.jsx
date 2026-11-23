const GameOver = ({ wordCount, score, onPlayAgain }) => {
  return (
    <div>
      <h2>Se terminó el tiempo</h2>
      <p>
        Encadenaste {wordCount} {wordCount === 1 ? "palabra" : "palabras"}y
        sumaste {score} puntos
      </p>
      <button type="button" onClick={onPlayAgain}>
        Jugar de nuevo
      </button>
    </div>
  );
};

export default GameOver;
