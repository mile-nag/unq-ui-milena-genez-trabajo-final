import { useState } from "react";
import { DEFAULT_ALIAS } from "../utils/gameRules";
import { pluralize } from "../utils/format";

const ALIAS_MAX_LENGTH = 3;

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
    <form className="game-over" onSubmit={handleSave}>
      <div className="game-over-screen sunken crt" role="status">
        <h2 className="game-over-title">Se terminó el tiempo</h2>
        <p>
          Encadenaste {wordCount} {pluralize(wordCount, "palabra", "palabras")}{" "}
          y sumaste {score} {pluralize(score, "punto", "puntos")}
        </p>

        {showSaveForm && (
          <>
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
            />
          </>
        )}
      </div>

      <div className="game-over-actions">
        {showSaveForm ? (
          <>
            <button type="submit" className="btn98">Guardar</button>
            <button type="button" className="btn98" onClick={() => setHasAnswered(true)}>
              No guardar
            </button>
          </>
        ) : (
          <button type="button" className="btn98" onClick={onPlayAgain}>
            Jugar de nuevo
          </button>
        )}
      </div>
    </form>
  );
};

export default GameOver;
