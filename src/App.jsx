import { useState } from "react";
import { DEFAULT_ALIAS, LEADERBOARD_SIZE } from "./utils/gameRules";
import { addScore, getLastAlias, getLeaderboard, saveLastAlias } from "./storage/leaderboard";
import Leaderboard from "./components/Leaderboard";
import Game from "./components/Game";
import RulesDialog from "./components/RulesDialog";
import "./App.css";
import Window from "./components/Window";

const App = () => {
  const [gameNumber, setGameNumber] = useState(1);
  const [leaderboard, setLeaderboard] = useState(getLeaderboard);
  const [lastAlias, setLastAlias] = useState(getLastAlias);
  const [showRules, setShowRules] = useState(false);
  const [hiddenWindows, setHiddenWindows] = useState({ game: false, ranking: false });

  const toggleWindow = (name) => {
    setHiddenWindows((previous) => ({ ...previous, [name]: !previous[name] }));
  };

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
    <div className="desktop">
      <main className="container-fluid desktop-content py-4">
        <h1 className="visually-hidden">Palabras Encadenadas</h1>

        <div className="row g-4 align-items-start">
          <div className="col-lg-8">
            <Window
              title="PALABRAS_ENCADENADAS.EXE"
              menu={
                <>
                  <button type="button" className="win-menu-btn" onClick={handlePlayAgain}>
                    <u>J</u>uego nuevo
                  </button>
                  <button type="button" className="win-menu-btn" onClick={() => setShowRules(true)}>
                    <u>A</u>yuda: reglas
                  </button>
                </>
              }
            >
              <Game
                key={gameNumber}
                leaderboard={leaderboard}
                lastAlias={lastAlias}
                onSaveScore={handleSaveScore}
                onPlayAgain={handlePlayAgain}
                isPaused={showRules || hiddenWindows.game}
              />
            </Window>
          </div>

          <div className="col-lg-4" hidden={hiddenWindows.ranking}>
            <Window
              title="TOP_10.EXE"
              onMinimize={() => toggleWindow("ranking")}
            >
              <Leaderboard results={leaderboard} size={LEADERBOARD_SIZE} />
            </Window>
          </div>
        </div>
      </main>

      <footer className="win taskbar">
        <span className="btn98 taskbar-start" aria-hidden="true">
          Inicio
        </span>
        <span className="sunken taskbar-item">PALABRAS</span>
        <button
          type="button"
          className={`taskbar-item ${hiddenWindows.ranking ? "win" : "sunken"}`}
          aria-pressed={!hiddenWindows.ranking}
          onClick={() => toggleWindow("ranking")}
        >
          TOP_10
        </button>
      </footer>

      {showRules && <RulesDialog onClose={() => setShowRules(false)} />}
    </div>
  );
};

export default App;
