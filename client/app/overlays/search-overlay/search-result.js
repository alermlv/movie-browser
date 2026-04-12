import { createIcon } from "../../components/icon.js";

export function createSearchResult(result) {
  const item = document.createElement("li");
  item.classList.add("search-overlay__result-item");

  const link = document.createElement("a");
  link.classList.add("search-overlay__result-link");
  link.href = `/${encodeURIComponent(result.type)}/${encodeURIComponent(result.id)}`;
  link.dataset.searchResult = "true";
  link.dataset.searchTitle = result.title;
  link.dataset.searchType = result.type;
  link.dataset.searchId = result.id;
  link.dataset.closeDialog = "search";

  const title = document.createElement("span");
  title.classList.add("search-overlay__result-title");
  title.textContent = result.title;

  const icon = createIcon("icon-chevron-forward");
  icon.classList.add("icon--small");

  link.append(title, icon);
  item.appendChild(link);

  return item;
}
