const Timer = ({ secondsLeft }) => {
  const isRunningOut = secondsLeft <= 5;

  return (
      <div className={`fs-2 fw-bold ${isRunningOut ? "text-danger" : ""}`}>
        {secondsLeft}
      </div>
  );
};

export default Timer;