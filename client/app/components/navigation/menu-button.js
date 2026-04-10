import { createIcon } from "../icon.js";

export function createMenuButton() {
  const menuButton = document.createElement("button");
  menuButton.type = "button";
  menuButton.classList.add("button", "button--menu");
  menuButton.setAttribute("aria-label", "Open menu");
  menuButton.tabIndex = 0;
  menuButton.dataset.openDialog = "menu";

  const icon = createIcon("icon-menu");

  menuButton.appendChild(icon);

  return menuButton;
}
