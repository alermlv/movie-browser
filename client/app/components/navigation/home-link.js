import { createMainLogo } from "./main-logo.js";

export function createHomeLink() {
  const homeLink = document.createElement("a");
  homeLink.classList.add("nav__home-link");
  homeLink.href = "/";
  homeLink.setAttribute("aria-label", "Home");

  const logo = createMainLogo();

  homeLink.appendChild(logo);

  return homeLink;
}
