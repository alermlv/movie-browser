import { createIcon } from "../../components/icon.js";

export function createCloseSearchButton() {
  const closeSearchButton = document.createElement("button");
  closeSearchButton.type = "button";
  closeSearchButton.classList.add("button--close-search");
  closeSearchButton.setAttribute("aria-label", "Close search");
  closeSearchButton.dataset.closeDialog = "search";

  const icon = createIcon("icon-close");

  const text = document.createElement("span");
  text.textContent = "Close";

  closeSearchButton.append(icon, text);

  return closeSearchButton;
}
