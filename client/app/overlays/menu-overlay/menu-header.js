import { createCloseMenuButton } from "./close-menu-button.js";

export function createMenuHeader() {
  const header = document.createElement("div");
  header.classList.add("menu-overlay__header");

  const menuInner = document.createElement("div");
  menuInner.classList.add("menu-overlay__header-inner");

  const closeMenuButton = createCloseMenuButton();

  menuInner.appendChild(closeMenuButton);
  header.appendChild(menuInner);

  return header;
}
