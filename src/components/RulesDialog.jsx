import { useEffect, useRef } from "react";
import { TURN_SECONDS } from "../utils/gameRules";

const RulesDialog = ({ onClose }) => {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    closeButtonRef.current.focus();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div className="modal d-block bg-dark bg-opacity-50" onClick={onClose}>
      <div className="modal-dialog modal-dialog-centered">
        <section
          className="modal-content"
          role="dialog"
          aria-modal="true"
          aria-labelledby="rules-title"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={handleKeyDown}
        >
          <div className="modal-header">
            <h2 id="rules-title" className="modal-title h5">
              Cómo se juega
            </h2>
          </div>
          <div className="modal-body">
            <ol className="mb-0">
              <li>Escribí cualquier palabra para empezar.</li>
              <li>
                Cada palabra nueva tiene que empezar con la última letra de la
                anterior.
              </li>
              <li>No se pueden repetir palabras.</li>
              <li>Cada letra suma 1 punto.</li>
              <li>
                Tenés {TURN_SECONDS} segundos por turno. Cada palabra válida
                reinicia el tiempo.
              </li>
            </ol>
          </div>
          <div className="modal-footer">
            <button
              ref={closeButtonRef}
              type="button"
              className="btn btn-primary"
              onClick={onClose}
            >
              Entendido
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RulesDialog;
