import { createInitialState } from "./state.js";

export function normalizeState(state) {
  const initialState = createInitialState();

  return {
    ...initialState,

    favorites: {
      keys: normalizeStringArray(state?.favorites?.keys),
    },

    genres: {
      byType: {
        movie: normalizeObject(state?.genres?.byType?.movie),
        tv: normalizeObject(state?.genres?.byType?.tv),
      },
    },

    searchHistory: normalizeSearchHistory(state?.searchHistory),
  };
}

function normalizeStringArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return [...new Set(value.map((item) => String(item).trim()).filter(Boolean))];
}

function normalizeSearchHistory(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  const normalizedHistory = [];

  value.forEach((item) => {
    const normalizedItem = normalizeSearchHistoryItem(item);

    if (!normalizedItem) {
      return;
    }

    if (
      normalizedHistory.some((existingItem) =>
        isSameHistoryItem(existingItem, normalizedItem),
      )
    ) {
      return;
    }

    normalizedHistory.push(normalizedItem);
  });

  return normalizedHistory;
}

function normalizeSearchHistoryItem(item) {
  if (!item) {
    return null;
  }

  // Поддержка старого формата: ["dune", "batman"]
  if (typeof item === "string") {
    const query = item.trim();

    if (!query) {
      return null;
    }

    return {
      title: query,
      query,
    };
  }

  if (typeof item !== "object" || Array.isArray(item)) {
    return null;
  }

  const title = typeof item.title === "string" ? item.title.trim() : "";

  if (!title) {
    return null;
  }

  // query item
  if (typeof item.query === "string") {
    const query = item.query.trim();

    if (!query) {
      return null;
    }

    return {
      title,
      query,
    };
  }

  // result item
  const type = typeof item.type === "string" ? item.type.trim() : "";
  const id =
    item.id !== undefined && item.id !== null ? String(item.id).trim() : "";

  if ((type === "movie" || type === "tv") && id) {
    return {
      title,
      type,
      id,
    };
  }

  return null;
}

function isSameHistoryItem(left, right) {
  if (left?.query && right?.query) {
    return left.query === right.query;
  }

  if (left?.type && left?.id && right?.type && right?.id) {
    return left.type === right.type && String(left.id) === String(right.id);
  }

  return false;
}

function normalizeObject(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value;
}
