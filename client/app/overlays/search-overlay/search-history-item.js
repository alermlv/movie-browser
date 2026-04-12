import { createIcon } from "../../components/icon.js";

export function createSearchHistoryItem(historyItem) {
  const item = document.createElement("li");
  item.classList.add("search-overlay__history-item");

  const link = document.createElement("a");
  link.classList.add("search-overlay__history-link");
  link.href = historyItem.href;
  link.dataset.searchHistoryItem = "true";
  link.dataset.closeDialog = "search";

  const historyIcon = createIcon("icon-history");

  const title = document.createElement("span");
  title.classList.add("search-overlay__history-title");
  title.textContent = historyItem.title;

  const chevronIcon = createIcon("icon-chevron-forward");
  chevronIcon.classList.add("icon--small");

  link.append(historyIcon, title, chevronIcon);
  item.appendChild(link);

  return item;
}
