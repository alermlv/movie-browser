import { createIcon } from "../icon.js";

export function createSideMenuButton() {
  const sideMenuButton = document.createElement("button");
  sideMenuButton.type = "button";
  sideMenuButton.classList.add("button", "button--menu");
  sideMenuButton.setAttribute("aria-label", "side-menu-overlay");
  sideMenuButton.tabIndex = 0;
  sideMenuButton.dataset.openSideMenu = "";

  const icon = createIcon("icon-menu");

  sideMenuButton.appendChild(icon);

  return sideMenuButton;
}
