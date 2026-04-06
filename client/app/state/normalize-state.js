import { createInitialState } from "./state.js";

export function normalizeState(state) {
  const initialState = createInitialState();

  return {
    ...initialState,

    favorites: {
      keys: normalizeArray(state?.favorites?.keys),
    },

    genres: {
      byType: {
        movie: normalizeObject(state?.genres?.byType?.movie),
        tv: normalizeObject(state?.genres?.byType?.tv),
      },
    },

    searchHistory: normalizeArray(state?.searchHistory),
  };
}

function normalizeArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return [...new Set(value.map((item) => String(item).trim()).filter(Boolean))];
}

function normalizeObject(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value;
}
