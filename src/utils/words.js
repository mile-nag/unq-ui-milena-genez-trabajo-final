const EQUIVALENCES = {
  á: "a",
  é: "e",
  í: "i",
  ó: "o",
  ú: "u",
  ñ: "n",
};

const ONLY_LETTERS = /^[a-z]+$/;

export const WORD_ERRORS = {
  INVALID_CHARACTERS: "INVALID_CHARACTERS",
  ALREADY_USED: "ALREADY_USED",
  BROKEN_CHAIN: "BROKEN_CHAIN",
};

export const normalizeWord = (word) =>
  word
    .trim()
    .toLowerCase()
    .normalize("NFC")
    .replace(/[áéíóúñ]/g, (letter) => EQUIVALENCES[letter]);

export const lastLetter = (word) => normalizeWord(word).at(-1);

export const validateWordLocal = (word, chain) => {
  const normalizedWord = normalizeWord(word);

  if (!ONLY_LETTERS.test(normalizedWord)) {
    return WORD_ERRORS.INVALID_CHARACTERS;
  }

  const isAlreadyUsed = chain.some(
    (usedWord) => normalizeWord(usedWord) === normalizedWord
  );
  if (isAlreadyUsed) {
    return WORD_ERRORS.ALREADY_USED;
  }

  const lastWord = chain.at(-1);
  if (lastWord && normalizedWord.at(0) !== lastLetter(lastWord)) {
    return WORD_ERRORS.BROKEN_CHAIN;
  }

  return null;
};