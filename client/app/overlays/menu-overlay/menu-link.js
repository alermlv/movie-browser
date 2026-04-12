export function createMenuLink(name, path) {
  const link = document.createElement("a");
  link.classList.add("menu-overlay__link");
  link.href = path;
  link.textContent = name;
  link.dataset.closeDialog = "menu";

  return link;
}
