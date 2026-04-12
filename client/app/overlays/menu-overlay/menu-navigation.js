import { createMenuLink } from "./menu-link.js";

export function createMenuNavigation() {
  const nav = document.createElement("nav");
  nav.classList.add("menu-overlay__nav");
  nav.setAttribute("aria-label", "Menu links");

  const list = document.createElement("ul");
  list.classList.add("menu-overlay__list");

  const favoritesLink = createMenuLink("Favorites", "/favorites");
  const moviesLink = createMenuLink("Movies", "/search?type=movie");
  const tvShowsLink = createMenuLink("TV Shows", "/search?type=tv");
  const animationLink = createMenuLink("Animation", "/search?genre=animation");

  list.append(favoritesLink, moviesLink, tvShowsLink, animationLink);
  nav.appendChild(list);

  return nav;
}
