const PREFIXES = {
  error: "ERR>",
  success: "OK>",
  info: ">",
};

const Feedback = ({ message, type = "info" }) => {
  return (
    <div className="feedback-slot">
      {message && (
        <div className={`feedback sunken feedback-${type}`} role="alert">
          <span aria-hidden="true">{PREFIXES[type]}</span> {message}
        </div>
      )}
    </div>
  );
};

export default Feedback;