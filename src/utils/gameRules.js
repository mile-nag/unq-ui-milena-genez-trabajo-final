export const TURN_SECONDS = 15; //duración de cada turno

export const calculateScore = (chain) => chain.reduce((total, word) => total + word.length, 0);

export const LEADERBOARD_SIZE = 10;

export const DEFAULT_ALIAS = "????";

export const qualifiesForLeaderboard = (score, leaderboard) =>
  leaderboard.length < LEADERBOARD_SIZE || score > leaderboard.at(-1).score;
