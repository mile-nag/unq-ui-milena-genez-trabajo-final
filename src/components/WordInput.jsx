import { useEffect, useRef, useState } from "react";
const MAX_WORD_LENGTH = 30;

const WordInput = ({ nextLetter, onSubmit, disabled = false, hasError = false }) => {
  const [word, setWord] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (!disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleChange = (e) => {
    setWord(e.target.value.replace(/\s/g, ""));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (word === "") {
      return;
    }

    const accepted = await onSubmit(word);
    if (accepted) {
      setWord("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="word-input" className="word-label">
        {nextLetter ? (
          <>
            Próxima letra: <strong>{nextLetter.toUpperCase()}</strong>
          </>
        ) : (
          "Escribí cualquier palabra para empezar..."
        )}
      </label>
      <div className="d-flex gap-2">
        <div className={`word-field sunken crt ${hasError ? "has-error" : ""}`}>
          <span className="word-prompt" aria-hidden="true">
            &gt;
          </span>
          <input
            ref={inputRef}
            id="word-input"
            type="text"
            className="word-input"
            value={word}
            onChange={handleChange}
            maxLength={MAX_WORD_LENGTH}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            disabled={disabled}
            aria-label="Palabra"
            aria-invalid={hasError}
            aria-describedby="word-feedback"
          />
        </div>
        <button
          type="submit"
          className="btn98"
          disabled={disabled || word === ""}
        >
          {disabled ? "Validando" : "Enviar"}
        </button>
      </div>
    </form>
  );
};

export default WordInput;
