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

export function renderSearchNodes(list, nodes) {
  list.replaceChildren(...nodes);
}

export function clearSearchResults(list) {
  list.replaceChildren();
}
