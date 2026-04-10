import { createMenuLink } from "./menu-link.js";

export function createMenuLinks() {
  const nav = document.createElement("nav");
  nav.classList.add("menu-overlay__links");
  nav.setAttribute("aria-label", "menu");

  const favoritesLink = createMenuLink("Favorites", "/favorites");
  const moviesLink = createMenuLink("Movies", "/search?type=movie");
  const tvShowsLink = createMenuLink("TV Shows", "/search?type=tv");
  const animationLink = createMenuLink("Animation", "/search?genre=animation");

  nav.append(favoritesLink, moviesLink, tvShowsLink, animationLink);

  return nav;
}
