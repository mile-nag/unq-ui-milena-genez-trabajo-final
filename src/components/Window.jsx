import { useId } from "react";

const Window = ({ title, menu, children }) => {
  const titleId = useId();

  return (
    <section className="win" aria-labelledby={titleId}>
      <div className="win-titlebar">
        <span id={titleId}>{title}</span>
        <span className="win-title-btns" aria-hidden="true">
          <span className="win-title-btn">_</span>
          <span className="win-title-btn">□</span>
          <span className="win-title-btn">x</span>
        </span>
      </div>
      {menu && <div className="win-menubar">{menu}</div>}
      <div className="win-body">{children}</div>
    </section>
  );
};

export default Window;