import { useState } from "react";
import { validateWord } from "./services/api";
import Timer from "./components/Timer";
import Scoreboard from "./components/Scoreboard";
import WordInput from "./components/WordInput";
import Feedback from "./components/Feedback";
import WordChain from "./components/WordChain";
import "./App.css";

const TURN_SECONDS = 15;
const NO_FEEDBACK = { message: "", type: "info" };

const App = () => {
  const [chain, setChain] = useState([]);
  const [feedback, setFeedback] = useState(NO_FEEDBACK);
  const [isValidating, setIsValidating] = useState(false);

  const score = chain.reduce((total, word) => total + word.length, 0);
  const lastWord = chain.at(-1);
  const nextLetter = lastWord ? lastWord.at(-1) : null;

  const handleWordSubmit = async (word) => {
    setIsValidating(true);
    setFeedback(NO_FEEDBACK);

    try {
      const exists = await validateWord(word);

      if (!exists) {
        setFeedback({ message: `"${word}" no existe en el diccionario`, type: "error" });
        return false;
      }

      setChain((previousChain) => [...previousChain, word]);
      setFeedback({ message: `"${word}" suma ${word.length}`, type: "success" });
      return true;
    } catch {
      setFeedback({ message: "No se pudo validar la palabra", type: "error" });
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <main className="container py-4">
      <h1 className="text-center mb-4">Palabras Encadenadas</h1>

      <section className="d-flex justify-content-around align-items-center mb-4">
        <Timer secondsLeft={TURN_SECONDS} />
        <Scoreboard score={score} wordCount={chain.length} />
      </section>

      <WordInput nextLetter={nextLetter} onSubmit={handleWordSubmit} disabled={isValidating} />
      <Feedback message={feedback.message} type={feedback.type} />
      <WordChain words={chain} />
    </main>
  );
};

export default App;