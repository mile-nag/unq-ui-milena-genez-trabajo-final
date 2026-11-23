import { useState } from "react";
import { DEFAULT_ALIAS } from "../utils/gameRules";

const ALIAS_MAX_LENGTH = 4;

const GameOver = ({
  wordCount,
  score,
  qualifies,
  initialAlias,
  onSave,
  onPlayAgain,
}) => {
  const [alias, setAlias] = useState(initialAlias);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleAliasChange = (e) => {
    setAlias(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(alias);
    setHasAnswered(true);
  };

  const showSaveForm = qualifies && !hasAnswered;

  return (
    <div>
      <h2>Se terminó el tiempo</h2>
      <p>
        Encadenaste {wordCount} {wordCount === 1 ? "palabra" : "palabras"} y
        sumaste {score} puntos
      </p>

      {showSaveForm ? (
        <form onSubmit={handleSave}>
          <p>Entraste al top 10</p>
          <div>
            <input
              type="text"
              value={alias}
              onChange={handleAliasChange}
              maxLength={ALIAS_MAX_LENGTH}
              size={ALIAS_MAX_LENGTH}
              placeholder={DEFAULT_ALIAS}
              autoComplete="off"
              aria-label="Alias"
            />

            <button type="submit">Guardar</button>
            
            <button type="button" onClick={() => setHasAnswered(true)}>
              No guardar
            </button>

          </div>
        </form>
      ) : (
        <button type="button" onClick={onPlayAgain}>
          Jugar de nuevo
        </button>
      )}
    </div>
  );
};

export default GameOver;
