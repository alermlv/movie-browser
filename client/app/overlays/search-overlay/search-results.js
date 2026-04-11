import { createSearchResult } from "./search-result.js";
import { createSearchHistoryItem } from "./search-history-item.js";

export function createSearchResults() {
  const container = document.createElement("div");
  container.classList.add("search-overlay__results");
  container.dataset.searchResults = "true";

  const list = document.createElement("ul");
  list.classList.add("search-results");

  container.appendChild(list);

  return {
    container,
    list,
  };
}

export function renderSearchResults(list, results) {
  list.replaceChildren();

  results.forEach((result) => {
    list.appendChild(createSearchResult(result));
  });
}

export function renderSearchHistory(list, historyItems) {
  list.replaceChildren();

  historyItems.forEach((historyItem) => {
    list.appendChild(createSearchHistoryItem(historyItem));
  });
}

export function clearSearchResults(list) {
  list.replaceChildren();
}
