import { normalizeSearchQuery } from "./search-service.js";

const SEARCH_HISTORY_LIMIT = 10;

export function createQueryHistoryItem(query) {
  const normalizedQuery = normalizeSearchQuery(query);

  if (!normalizedQuery) {
    return null;
  }

  return {
    title: normalizedQuery,
    query: normalizedQuery,
  };
}

export function createResultHistoryItem(result) {
  const title = (result?.title || "").trim();
  const type = result?.type || "";
  const id = result?.id ? String(result.id) : "";

  if (!title || !type || !id) {
    return null;
  }

  return {
    title,
    type,
    id,
  };
}

export function addSearchHistoryItem(searchHistory, nextItem) {
  if (!nextItem) {
    return Array.isArray(searchHistory) ? searchHistory : [];
  }

  const history = Array.isArray(searchHistory) ? [...searchHistory] : [];
  const filteredHistory = history.filter(
    (item) => !isSameHistoryItem(item, nextItem),
  );

  return [nextItem, ...filteredHistory].slice(0, SEARCH_HISTORY_LIMIT);
}

export function toSearchHistoryViewModels(searchHistory) {
  const history = Array.isArray(searchHistory) ? searchHistory : [];

  return history
    .map((item) => {
      const href = getSearchHistoryHref(item);

      if (!href || !item?.title) {
        return null;
      }

      return {
        title: item.title,
        href,
      };
    })
    .filter(Boolean);
}

export function getSearchHistoryHref(item) {
  if (item?.query) {
    return `/search?q=${encodeURIComponent(item.query)}`;
  }

  if (item?.type && item?.id) {
    return `/${encodeURIComponent(item.type)}/${encodeURIComponent(item.id)}`;
  }

  return "";
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
