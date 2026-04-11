import { getSearchData } from "../../services/api.js";

const SEARCH_MIN_LENGTH = 2;
const SEARCH_LIMIT = 10;

let abortController = null;
let requestId = 0;

export function getSearchMinLength() {
  return SEARCH_MIN_LENGTH;
}

export function normalizeSearchQuery(query) {
  return query.trim();
}

export function canSearch(query) {
  return normalizeSearchQuery(query).length >= SEARCH_MIN_LENGTH;
}

export async function fetchSearchResults(query) {
  const normalizedQuery = normalizeSearchQuery(query);

  if (!canSearch(normalizedQuery)) {
    return {
      requestId: ++requestId,
      results: [],
    };
  }

  if (abortController) {
    abortController.abort();
  }

  abortController = new AbortController();
  const currentRequestId = ++requestId;

  const payload = await getSearchData(
    {
      q: normalizedQuery,
      limit: SEARCH_LIMIT,
    },
    {
      signal: abortController.signal,
    },
  );

  return {
    requestId: currentRequestId,
    results: normalizeSearchResults(payload),
  };
}

function normalizeSearchResults(payload) {
  const rawResults = resolveRawResults(payload);

  return rawResults
    .map((item) => ({
      id: String(item.id ?? ""),
      type: normalizeMediaType(item.media_type ?? item.type),
      title: resolveResultTitle(item),
    }))
    .filter((item) => item.id && item.type && item.title)
    .slice(0, SEARCH_LIMIT);
}

function resolveRawResults(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  return [];
}

function normalizeMediaType(type) {
  if (type === "movie" || type === "tv") {
    return type;
  }

  return "";
}

function resolveResultTitle(item) {
  return item.title || item.name || "";
}
