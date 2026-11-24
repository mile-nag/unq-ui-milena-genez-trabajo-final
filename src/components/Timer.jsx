const Timer = ({ secondsLeft, totalSeconds }) => {
  const isRunningOut = secondsLeft <= 5;

  const blocks = Array.from({ length: totalSeconds }, (_, index) => index < secondsLeft);
  return (
    <div className={`timer ${isRunningOut ? "is-running-out" : ""}`}>
      <div className="d-flex gap-2 align-items-baseline">
        <span className="timer-label">Tiempo del turno</span>
        <span className="timer-seconds">
          00:{String(secondsLeft).padStart(2, "0")}
        </span>
      </div>
      <div
        className="timer-bar sunken"
        role="progressbar"
        aria-label="Tiempo restante"
        aria-valuemin={0}
        aria-valuemax={totalSeconds}
        aria-valuenow={secondsLeft}
      >
        {blocks.map((isOn, index) => (
          <span key={index} className={`timer-block ${isOn ? "is-on" : ""}`} />
        ))}
      </div>
    </div>
  );
};

export default Timer;
