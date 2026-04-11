import { createMenuHeader } from "./menu-header.js";
import { createMenuLinks } from "./menu-links.js";

export function createMenuOverlay() {
  const backdrop = document.createElement("div");
  backdrop.classList.add("menu-overlay");
  backdrop.dataset.dialogBackdrop = "menu";

  const panel = document.createElement("section");
  panel.classList.add("menu-overlay__panel");
  panel.dataset.dialogPanel = "menu";
  panel.setAttribute("aria-label", "Menu");
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "true");

  const header = createMenuHeader();
  const links = createMenuLinks();

  panel.append(header, links);
  backdrop.appendChild(panel);

  return backdrop;
}
