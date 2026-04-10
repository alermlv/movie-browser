import { createCloseMenuButton } from "./close-menu-button.js";

export function createMenuHeader() {
  const header = document.createElement("div");
  header.classList.add("menu-header");

  const menuInner = document.createElement("div");
  menuInner.classList.add("menu__inner");

  const closeMenuButton = createCloseMenuButton();

  menuInner.appendChild(closeMenuButton);
  header.appendChild(menuInner);

  return header;
}
