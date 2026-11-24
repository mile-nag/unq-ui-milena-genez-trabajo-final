const WordChain = ({ words }) => {
  return (
    <section
      className="chain-screen sunken crt"
      aria-label="Cadena de palabras"
    >
      <p className="chain-header" aria-hidden="true">
        C:\PALABRAS&gt; cadena
      </p>

      {words.length === 0 ? (
        <p className="chain-empty">
          Todavía no hay palabras. ¡Escribí la primera!
        </p>
      ) : (
        <ol className="chain-list">
          {words.map((word) => (
            <li key={word} className="chain-item">
              <span className="chain-word">{word}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
};

export default WordChain;
