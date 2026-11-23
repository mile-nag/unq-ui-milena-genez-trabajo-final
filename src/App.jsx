import { useState } from "react";
import { validateWord } from "./services/api";
import { lastLetter, validateWordLocal, WORD_ERRORS } from "./utils/words";
import { calculateScore, TURN_SECONDS } from "./utils/gameRules";
import Timer from "./components/Timer";
import Scoreboard from "./components/Scoreboard";
import WordInput from "./components/WordInput";
import Feedback from "./components/Feedback";
import WordChain from "./components/WordChain";
import useCountdown from "./hooks/useCountdown";
import GameOver from "./components/GameOver";
import "./App.css";

const NO_FEEDBACK = { message: "", type: "info" };
const ERROR_MESSAGES = {
  [WORD_ERRORS.INVALID_CHARACTERS]: () =>
    "Usá solo letras, sin espacios, números ni signos",
  [WORD_ERRORS.ALREADY_USED]: (word) => `"${word}" ya fue utilizada!`,
  [WORD_ERRORS.BROKEN_CHAIN]: (word, letter) =>
    `"${word}" no empieza con "${letter.toUpperCase()}"`,
};

const App = () => {
  const [chain, setChain] = useState([]);
  const [feedback, setFeedback] = useState(NO_FEEDBACK);
  const [isValidating, setIsValidating] = useState(false);

  const hasStarted = chain.length > 0;
  const { secondsLeft, reset: resetTimer } = useCountdown(
    TURN_SECONDS,
    hasStarted && !isValidating,
  );
  const isGameOver = secondsLeft === 0;

  const score = calculateScore(chain);
  const lastWord = chain.at(-1);
  const nextLetter = lastWord ? lastLetter(lastWord) : null;

  const handleWordSubmit = async (word) => {
    const localError = validateWordLocal(word, chain);

    if (localError) {
      setFeedback({
        message: ERROR_MESSAGES[localError](word, nextLetter),
        type: "error",
      });
      return false;
    }

    setIsValidating(true);
    setFeedback(NO_FEEDBACK);

    try {
      const exists = await validateWord(word);

      if (!exists) {
        setFeedback({
          message: `"${word}" no existe en el diccionario`,
          type: "error",
        });
        return false;
      }

      setChain((previousChain) => [...previousChain, word]);
      resetTimer();
      setFeedback({
        message: `"${word}" suma ${word.length}`,
        type: "success",
      });
      return true;
    } catch {
      setFeedback({ message: "No se pudo validar la palabra", type: "error" });
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  const handlePlayAgain = () => {
    setChain([]);
    setFeedback(NO_FEEDBACK);
    resetTimer();
  };

  return (
    <main className="container py-4">
      <h1 className="text-center mb-4">Palabras Encadenadas</h1>

      <section className="d-flex justify-content-around align-items-center mb-4">
        <Timer secondsLeft={secondsLeft} />
        <Scoreboard score={score} wordCount={chain.length} />
      </section>

      {isGameOver ? (
        <GameOver
          wordCount={chain.length}
          score={score}
          onPlayAgain={handlePlayAgain}
        ></GameOver>
      ) : (
        <div>
          <WordInput
            nextLetter={nextLetter}
            onSubmit={handleWordSubmit}
            disabled={isValidating}
          />
          <Feedback message={feedback.message} type={feedback.type} />
        </div>
      )}

      <WordChain words={chain} />
    </main>
  );
};

export default App;
