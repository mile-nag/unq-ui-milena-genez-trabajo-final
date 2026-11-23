import { LEADERBOARD_SIZE } from "../utils/gameRules";

const STORAGE_KEY = "palabras-encadenadas:leaderboard";
const ALIAS_KEY = "palabras-encadenadas:alias";

export const getLeaderboard = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const addScore = (result) => {
  const updated = [...getLeaderboard(), result]
    .sort((p1, p2) => p2.score - p1.score)
    .slice(0, LEADERBOARD_SIZE);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    //si no se puede guardar, el juego sigue sin persistir el ranking 
  }

  return updated;
};

export const getLastAlias = () => {
  try {
    return localStorage.getItem(ALIAS_KEY) ?? "";
  } catch {
    return "";
  }
};

export const saveLastAlias = (alias) => {
  try {
    localStorage.setItem(ALIAS_KEY, alias);
  } catch {
    // si no se puede guardar, simplemente no se guarda
  }
};
