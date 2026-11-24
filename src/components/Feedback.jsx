const ICONS = {
  error: "bi-x-circle-fill",
  success: "bi-check-circle-fill",
  info: "bi-info-circle-fill",
};

const Feedback = ({ message, type = "info" }) => {
  return (
    <div className="feedback-slot" id="word-feedback">
      {message && (
        <div className={`feedback sunken feedback-${type}`} role="alert">
          <i className={`bi ${ICONS[type]} feedback-icon`} aria-hidden="true" />
          {message}
        </div>
      )}
    </div>
  );
};

export default Feedback;