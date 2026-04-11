import { commitState, getState } from "../../state/state.js";
import { navigate } from "../../router/router.js";
import { ROUTES } from "../../router/routes.js";
import {
  fetchSearchResults,
  getSearchMinLength,
  normalizeSearchQuery,
  canSearch,
} from "./search-service.js";
import {
  renderSearchResults,
  renderSearchHistory,
  clearSearchResults,
} from "./search-results.js";
import {
  createQueryHistoryItem,
  addSearchHistoryItem,
  toSearchHistoryViewModels,
} from "./history-service.js";

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

    const historyItem = createQueryHistoryItem(query);

    commitState((state) => ({
      ...state,
      searchHistory: addSearchHistoryItem(state.searchHistory, historyItem),
      ui: {
        ...state.ui,
        activeDialog: null,
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

export function showInitialSearchState(resultsList) {
  const state = getState();
  const historyItems = toSearchHistoryViewModels(state.searchHistory);

  renderSearchHistory(resultsList, historyItems);
}

function scheduleSearch(input, resultsList) {
  const query = normalizeSearchQuery(input.value);

  window.clearTimeout(debounceTimer);

  if (!query.length) {
    latestRenderedRequestId = 0;
    const historyItems = toSearchHistoryViewModels(getState().searchHistory);
    renderSearchHistory(resultsList, historyItems);
    return;
  }

  if (query.length < getSearchMinLength()) {
    latestRenderedRequestId = 0;
    clearSearchResults(resultsList);
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

      clearSearchResults(resultsList);
    }
  }, SEARCH_DEBOUNCE_MS);
}
