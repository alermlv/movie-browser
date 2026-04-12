import { createMenuHeader } from "./menu-header.js";
import { createMenuNavigation } from "./menu-navigation.js";

export function createMenuOverlay() {
  const backdrop = document.createElement("div");
  backdrop.classList.add("menu-overlay");
  backdrop.dataset.dialogBackdrop = "menu";

  const panel = document.createElement("section");
  panel.classList.add("menu-overlay__panel");
  panel.dataset.dialogPanel = "menu";
  panel.setAttribute("aria-labelledby", "menu-overlay-title");
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "true");

  const title = document.createElement("h2");
  title.id = "menu-overlay-title";
  title.classList.add("visually-hidden");
  title.textContent = "Menu";

  const header = createMenuHeader();
  const links = createMenuNavigation();

  panel.append(title, header, links);
  backdrop.appendChild(panel);

  return backdrop;
}
