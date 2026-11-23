export const TURN_SECONDS = 15; //duración de cada turno

export const calculateScore = (chain) => chain.reduce((total, word) => total + word.length, 0);

