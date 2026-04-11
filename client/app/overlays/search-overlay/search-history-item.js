import { createIcon } from "../../components/icon.js";

export function createSearchHistoryItem(value) {
  const item = document.createElement("li");
  item.classList.add("search-history-item");

  const link = document.createElement("a");
  link.classList.add("search-history-item__link");
  link.href = `/search?q=${encodeURIComponent(value)}`;
  link.dataset.searchHistoryItem = "true";
  link.dataset.searchHistoryValue = value;
  link.dataset.closeDialog = "search";

  const historyIcon = createIcon("icon-history");

  const title = document.createElement("span");
  title.classList.add("search-history-item__title");
  title.textContent = value;

  const chevronIcon = createIcon("icon-chevron-forward");
  chevronIcon.classList.add("icon--small");

  link.append(historyIcon, title, chevronIcon);
  item.appendChild(link);

  return item;
}
