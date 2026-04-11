import { createIcon } from "../icon.js";

export function createSearchButton() {
  const searchButton = document.createElement("button");
  searchButton.type = "button";
  searchButton.classList.add("button", "button--search");
  searchButton.setAttribute("aria-label", "Open search");
  searchButton.tabIndex = 1;
  searchButton.dataset.openDialog = "search";
  
  const icon = createIcon("icon-search");

  const text = document.createElement("span");
  text.textContent = "Search";
  
  searchButton.append(icon, text);
  
  return searchButton;
}
