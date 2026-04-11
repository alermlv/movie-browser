import { createIcon } from "../../components/icon.js";

export function createSearchHistoryItem(historyItem) {
  const item = document.createElement("li");
  item.classList.add("search-history-item");

  const link = document.createElement("a");
  link.classList.add("search-history-item__link");
  link.href = historyItem.href;
  link.dataset.searchHistoryItem = "true";
  link.dataset.closeDialog = "search";

  const historyIcon = createIcon("icon-history");
  historyIcon.classList.add("search-history-item__icon");

  const title = document.createElement("span");
  title.classList.add("search-history-item__title");
  title.textContent = historyItem.title;

  const chevronIcon = createIcon("icon-chevron-forward");
  chevronIcon.classList.add("icon--small");

  link.append(historyIcon, title, chevronIcon);
  item.appendChild(link);

  return item;
}
