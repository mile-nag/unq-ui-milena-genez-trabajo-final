import { useState } from "react";
import { DEFAULT_ALIAS } from "./utils/gameRules";
import { addScore, getLastAlias, getLeaderboard, saveLastAlias } from "./storage/leaderboard";
import Leaderboard from "./components/Leaderboard";
import Game from "./components/Game";
import "./App.css";

const App = () => {
  const [gameNumber, setGameNumber] = useState(1);
  const [leaderboard, setLeaderboard] = useState(getLeaderboard);
  const [lastAlias, setLastAlias] = useState(getLastAlias);

  const handlePlayAgain = () => {
    setGameNumber((previousNumber) => previousNumber + 1);
  };

  const handleSaveScore = ({ alias, score, wordCount }) => {
    const updatedLeaderboard = addScore({
      alias: alias || DEFAULT_ALIAS,
      score,
      wordCount,
      date: new Date().toISOString(),
    });

    setLeaderboard(updatedLeaderboard);

    saveLastAlias(alias);
    setLastAlias(alias);
  };

  return (
    <main className="container py-4">
      <h1 className="text-center mb-4">Palabras Encadenadas</h1>

      <div className="row g-4">
        <div className="col-md-8">
          <Game
            key={gameNumber}
            leaderboard={leaderboard}
            lastAlias={lastAlias}
            onSaveScore={handleSaveScore}
            onPlayAgain={handlePlayAgain}
          />
        </div>

        <aside className="col-md-4">
          <Leaderboard results={leaderboard} />
        </aside>
      </div>
    </main>
  );
};

export default App;
