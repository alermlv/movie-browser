import { createSideMenuButton } from "./side-menu-button.js";
import { createHomeLink } from "./home-link.js";
import { createSearchButton } from "./search-button.js";

export function createNavigation() {
  const navigation = document.createElement("nav");
  navigation.classList.add("nav", "nav--sticky");

  const navigationInner = document.createElement("div");
  navigationInner.classList.add("nav__inner");

  const sideMenuButton = createSideMenuButton();
  const homeLink = createHomeLink();
  const searchButton = createSearchButton();

  navigationInner.append(sideMenuButton, homeLink, searchButton);
  navigation.appendChild(navigationInner);

  return navigation;
}
