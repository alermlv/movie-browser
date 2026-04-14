import { commitState, getState } from "../../state/state.js";
import { navigate } from "../../router/router.js";
import { ROUTES } from "../../router/routes.js";
import {
  fetchSearchResults,
  getSearchMinLength,
  normalizeSearchQuery,
  canSearch,
} from "./search-service.js";
import { renderSearchNodes, clearSearchResults } from "./search-results.js";
import { createSearchResult } from "./search-result.js";
import { createSearchHistoryItem } from "./search-history-item.js";
import {
  createQueryHistoryItem,
  createSearchHistoryViewModels,
  addSearchHistoryItem,
} from "./history-service.js";

const SEARCH_DEBOUNCE_MS = 250;

let debounceTimer = null;

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
  renderSearchHistoryState(resultsList);
}

function scheduleSearch(input, resultsList) {
  const query = normalizeSearchQuery(input.value);

  window.clearTimeout(debounceTimer);

  if (!query.length) {
    renderSearchHistoryState(resultsList);
    return;
  }

  if (query.length < getSearchMinLength()) {
    clearSearchResults(resultsList);
    return;
  }

  debounceTimer = window.setTimeout(async () => {
    try {
      const { results } = await fetchSearchResults(query);
      const resultNodes = results.map(createSearchResult);

      renderSearchNodes(resultsList, resultNodes);
    } catch (error) {
      if (error?.name === "AbortError") {
        return;
      }

      clearSearchResults(resultsList);
    } finally {
      debounceTimer = null;
    }
  }, SEARCH_DEBOUNCE_MS);
}

function renderSearchHistoryState(resultsList) {
  const historyItems = createSearchHistoryViewModels(getState().searchHistory);
  const historyNodes = historyItems.map(createSearchHistoryItem);

  renderSearchNodes(resultsList, historyNodes);
}
