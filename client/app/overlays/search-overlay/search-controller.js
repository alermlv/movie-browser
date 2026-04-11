import { commitState, getState } from "../../state/state.js";
import { navigate } from "../../router/router.js";
import { ROUTES } from "../../router/routes.js";
import {
  fetchSearchResults,
  getSearchMinLength,
  normalizeSearchQuery,
  canSearch,
} from "./search-service.js";
import { renderSearchResults } from "./search-results.js";

const SEARCH_DEBOUNCE_MS = 250;

let debounceTimer = null;
let latestRenderedRequestId = 0;

export function bindSearchController({ form, input, resultsList }) {
  input.addEventListener("input", () => {
    scheduleSearch(input, resultsList);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = normalizeSearchQuery(input.value);

    if (!canSearch(query)) {
      input.focus();
      return;
    }

    commitState((state) => ({
      ...state,
      searchHistory: addSearchHistoryItem(state.searchHistory, query),
      ui: {
        ...state.ui,
        activeDialog: null,
        searchDraft: query,
      },
    }));

    navigate({
      name: ROUTES.SEARCH,
      params: {},
      query: {
        q: query,
      },
    });
  });
}

export function getInitialSearchDraft() {
  return getState().ui.searchDraft || "";
}

function scheduleSearch(input, resultsList) {
  const query = normalizeSearchQuery(input.value);

  window.clearTimeout(debounceTimer);

  if (query.length < getSearchMinLength()) {
    latestRenderedRequestId = 0;
    resultsList.replaceChildren();
    return;
  }

  debounceTimer = window.setTimeout(async () => {
    try {
      const { requestId, results } = await fetchSearchResults(query);

      if (requestId < latestRenderedRequestId) {
        return;
      }

      latestRenderedRequestId = requestId;
      renderSearchResults(resultsList, results);
    } catch (error) {
      if (error?.name === "AbortError") {
        return;
      }

      resultsList.replaceChildren();
    }
  }, SEARCH_DEBOUNCE_MS);
}

function addSearchHistoryItem(searchHistory, query) {
  const normalizedQuery = normalizeSearchQuery(query);
  const history = Array.isArray(searchHistory) ? [...searchHistory] : [];

  const filteredHistory = history.filter(
    (item) => normalizeSearchQuery(item) !== normalizedQuery,
  );

  return [normalizedQuery, ...filteredHistory].slice(0, 10);
}
