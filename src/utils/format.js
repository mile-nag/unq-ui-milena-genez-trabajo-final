export const formatScore = (value) => String(value).padStart(4, "0");

export const pluralize = (count, singular, plural) => (count === 1 ? singular : plural);