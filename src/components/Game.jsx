import { useState } from "react";
import { validateWord } from "../services/api";
import { lastLetter, validateWordLocal, WORD_ERRORS } from "../utils/words";
import { calculateScore, qualifiesForLeaderboard, TURN_SECONDS } from "../utils/gameRules";
import useCountdown from "../hooks/useCountdown";
import Timer from "./Timer";
import Scoreboard from "./Scoreboard";
import WordInput from "./WordInput";
import Feedback from "./Feedback";
import WordChain from "./WordChain";
import GameOver from "./GameOver";

const NO_FEEDBACK = { message: "", type: "info" };

const ERROR_MESSAGES = {
  [WORD_ERRORS.INVALID_CHARACTERS]: () =>
    "Usá solo letras, sin espacios, números ni signos.",
  [WORD_ERRORS.ALREADY_USED]: (word) => `"${word}" ya fue utilizada.`,
  [WORD_ERRORS.BROKEN_CHAIN]: (word, letter) =>
    `"${word}" no empieza con "${letter.toUpperCase()}".`,
};

const Game = ({ leaderboard, lastAlias, onSaveScore, onPlayAgain, isPaused }) => {
  const [chain, setChain] = useState([]);
  const [feedback, setFeedback] = useState(NO_FEEDBACK);
  const [isValidating, setIsValidating] = useState(false);

  const hasStarted = chain.length > 0;
  const { secondsLeft, reset: resetTimer } = useCountdown(
    TURN_SECONDS,
    hasStarted && !isValidating && !isPaused,
  );
  const isGameOver = secondsLeft === 0;

  const score = calculateScore(chain);
  const lastWord = chain.at(-1);
  const nextLetter = lastWord ? lastLetter(lastWord) : null;
  const qualifies = qualifiesForLeaderboard(score, leaderboard);
  const bestScore = leaderboard[0]?.score ?? 0;

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
        message: `"${word}" suma ${word.length} ${word.length === 1 ? "punto" : "puntos"}.`,
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

  const handleSaveScore = (alias) => {
    onSaveScore({ alias, score, wordCount: chain.length });
  };

  return (
    <>
      <section className="d-flex flex-wrap gap-3 align-items-stretch mb-3">        
        <Timer secondsLeft={secondsLeft} totalSeconds={TURN_SECONDS} />
        <Scoreboard score={score} wordCount={chain.length} bestScore={bestScore} />
      </section>

      <WordChain words={chain} />

      {isGameOver ? (
        <GameOver
          wordCount={chain.length}
          score={score}
          qualifies={qualifies}
          initialAlias={lastAlias}
          onSave={handleSaveScore}
          onPlayAgain={onPlayAgain}
        />
      ) : (
        <>
          <WordInput
            nextLetter={nextLetter}
            onSubmit={handleWordSubmit}
            disabled={isValidating}
          />
          <Feedback message={feedback.message} type={feedback.type} />
        </>
      )}
    </>
  );
};

export default Game;
