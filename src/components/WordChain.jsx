const WordChain = ({ words, user }) => {
  const promptUser = user ? user.toLowerCase() : "user";
  
  return (
    <section
      className="chain-screen sunken crt"
      aria-label="Cadena de palabras"
    >
      <p className="chain-header" aria-hidden="true">
        <span className="prompt-user">{promptUser}@palabras</span>:
        <span className="prompt-path">~</span>$ cat cadena.txt
      </p>

      {words.length === 0 ? (
        <p className="chain-empty">
          # todavía no hay palabras. ¡escribí la primera!
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
