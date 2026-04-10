import { getOverlayRoot } from "../layout/app-shell.js";
import { createMenuOverlay } from "./menu-overlay/menu-overlay.js";

export function renderOverlay(state) {
  const overlayRoot = getOverlayRoot();

  if (!overlayRoot) {
    return;
  }

  overlayRoot.replaceChildren();

  if (state.ui.activeDialog === "menu") {
    overlayRoot.appendChild(createMenuOverlay());
  }
}
