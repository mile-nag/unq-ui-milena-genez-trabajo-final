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
          className="win rules-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="rules-title"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={handleKeyDown}
        >
          <div className="win-titlebar">
            <h2 id="rules-title" className="rules-title">
              Ayuda: cómo se juega
            </h2>
            <button
              type="button"
              className="win-title-btn"
              aria-label="Cerrar"
              onClick={onClose}
            >
              x
            </button>
          </div>
          <div className="win-body">
            <div className="rules-screen sunken crt">
              <ol className="rules-list">
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
            <div className="d-flex justify-content-end mt-3">
              <button
                ref={closeButtonRef}
                type="button"
                className="btn98"
                onClick={onClose}
              >
                Entendido
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RulesDialog;
