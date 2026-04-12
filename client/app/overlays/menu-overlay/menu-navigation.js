import { createMenuItem } from "./menu-item.js";

export function createMenuNavigation() {
  const nav = document.createElement("nav");
  nav.classList.add("menu-overlay__nav");
  nav.setAttribute("aria-label", "Menu links");

  const list = document.createElement("ul");
  list.classList.add("menu-overlay__list");

  const favoritesLink = createMenuItem("Favorites", "/favorites");
  const moviesLink = createMenuItem("Movies", "/search?type=movie");
  const tvShowsLink = createMenuItem("TV Shows", "/search?type=tv");
  const animationLink = createMenuItem("Animation", "/search?genre=animation");

  list.append(favoritesLink, moviesLink, tvShowsLink, animationLink);
  nav.appendChild(list);

  return nav;
}
