const WordChain = ({ words }) => {
  if (words.length === 0) {
    return <p>Todavía no hay palabras...</p>;
  }

  return (
    <ol>
      {words.map((word) => (
        <li key={word}>{word}</li>
      ))}
    </ol>
  );
};

export default WordChain;
