import { createIcon } from "../../components/icon.js";

export function createSearchResult(result) {
  const item = document.createElement("li");
  item.classList.add("search-result");

  const link = document.createElement("a");
  link.classList.add("search-result__link");
  link.href = `/${encodeURIComponent(result.type)}/${encodeURIComponent(result.id)}`;
  link.dataset.searchResult = "true";
  link.dataset.searchTitle = result.title;
  link.dataset.closeDialog = "search";

  const title = document.createElement("span");
  title.classList.add("search-result__title");
  title.textContent = result.title;

  const icon = createIcon("icon-chevron-forward");
  icon.classList.add("icon--small");

  link.append(title, icon);
  item.appendChild(link);

  return item;
}
