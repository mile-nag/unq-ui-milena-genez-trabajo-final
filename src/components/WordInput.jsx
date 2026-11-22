import { useEffect, useRef, useState } from "react";
const MAX_WORD_LENGTH = 30;

const WordInput = ({ nextLetter, onSubmit, disabled = false }) => {
  const [word, setWord] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (!disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleChange = (e) => {
    setWord(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedWord = word.trim();
    if (trimmedWord === "") {
      return;
    }

    const accepted = await onSubmit(trimmedWord);
    if (accepted) {
      setWord("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex">
        <input
          ref={inputRef}
          type="text"
          className="form-control form-control-lg"
          placeholder={
            nextLetter
              ? `Empezá con "${nextLetter.toUpperCase()}"`
              : "Escribí cualquier palabra"
          }
          value={word}
          onChange={handleChange}
          maxLength={MAX_WORD_LENGTH}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          autoFocus
          disabled={disabled}
          aria-label="Palabra"
        />
        <button
          type="submit"
          className="btn btn-primary btn-lg"
          disabled={disabled || word.trim() === ""}
        >
          {disabled ? "Validando" : "Enviar"}
        </button>
      </div>
      {nextLetter && (
        <div className="form-text">
          Próxima letra: <strong>{nextLetter.toUpperCase()}</strong>
        </div>
      )}
    </form>
  );
};

export default WordInput;
