const ALERT_CLASSES = {
  error: "alert-danger",
  success: "alert-success",
  info: "alert-info",
};

const Feedback = ({ message, type = "info" }) => {
  return (
    <div>
      {message && (
        <div className={`alert ${ALERT_CLASSES[type]} py-2 mb-0`} role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default Feedback;