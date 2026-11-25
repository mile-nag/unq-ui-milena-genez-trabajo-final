import { useId } from "react";

const Window = ({ title, menu, onMinimize, children }) => {
  const titleId = useId();
  const canMinimize = Boolean(onMinimize);

  const minimizeButton = (
    <button
      type="button"
      className="win-title-btn"
      aria-label="Minimizar"
      onClick={onMinimize}
      disabled={!canMinimize}
    >
      _
    </button>
  );

  return (
    <section className="win" aria-labelledby={titleId}>
      <div className="win-titlebar">
        <span id={titleId}>{title}</span>
        <span className="win-title-btns">
          {canMinimize && minimizeButton}
          <span className="win-title-disabled" data-tooltip="No disponible">
            {!canMinimize && minimizeButton}
            <button type="button" className="win-title-btn" aria-label="Maximizar" disabled>□</button>
            <button type="button" className="win-title-btn" aria-label="Cerrar" disabled>x</button>
          </span>
        </span>
      </div>
      {menu && <div className="win-menubar">{menu}</div>}
      <div className="win-body">{children}</div>
    </section>
  );
};

export default Window;
