export function createMenuItem(name, path) {
  const item = document.createElement("li");
  item.classList.add("menu-overlay__item");

  const link = document.createElement("a");
  link.classList.add("menu-overlay__link");
  link.href = path;
  link.textContent = name;
  link.dataset.closeDialog = "menu";

  item.appendChild(link);

  return item;
}
