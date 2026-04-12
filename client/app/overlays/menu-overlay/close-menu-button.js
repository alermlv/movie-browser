import { createIcon } from "../../components/icon.js";

export function createCloseMenuButton() {
  const closeMenuButton = document.createElement("button");
  closeMenuButton.type = "button";
  closeMenuButton.classList.add("button", "button--close");
  closeMenuButton.dataset.closeDialog = "menu";

  const icon = createIcon("icon-close");

  const text = document.createElement("span");
  text.textContent = "Close";

  closeMenuButton.append(icon, text);

  return closeMenuButton;
}
