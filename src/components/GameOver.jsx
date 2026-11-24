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
    <div className="game-over sunken crt" role="status">
      <h2 className="game-over-title">Se terminó el tiempo</h2>
      <p>
        Encadenaste {wordCount} {wordCount === 1 ? "palabra" : "palabras"} y
        sumaste {score} puntos
      </p>

      {showSaveForm ? (
        <form className="game-over-form" onSubmit={handleSave}>
          <p className="game-over-highlight">*** Entraste al top 10 ***</p>
          <label htmlFor="alias-input">
            ¿Querés guardar tu puntaje? Ingresá tu alias:
          </label>
          <input
            id="alias-input"
            type="text"
            className="alias-input"
            value={alias}
            onChange={handleAliasChange}
            maxLength={ALIAS_MAX_LENGTH}
            size={ALIAS_MAX_LENGTH}
            placeholder={DEFAULT_ALIAS}
            autoComplete="off"
            aria-label="Alias"
          />

          <div className="d-flex gap-2 justify-content-center">
            <button type="submit" className="btn98">Guardar</button>

            <button type="button" className="btn98" onClick={() => setHasAnswered(true)}>
              No guardar
            </button>
          </div>
        </form>
      ) : (
        <button type="button" className="btn98" onClick={onPlayAgain}>
          Jugar de nuevo
        </button>
      )}
    </div>
  );
};

export default GameOver;
