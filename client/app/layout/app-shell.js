import { createNavigation } from "../components/navigation/navigation.js";

let pageRoot = null;
let overlayRoot = null;

export function mountAppShell() {
  const app = document.getElementById("app");

  if (!app) {
    return;
  }

  app.innerHTML = "";

  const header = document.createElement("header");
  const main = document.createElement("main");
  const overlays = document.createElement("div");

  overlays.id = "overlay-root";

  const navigation = createNavigation();

  header.appendChild(navigation);
  app.append(header, main, overlays);

  pageRoot = main;
  overlayRoot = overlays;
}

export function getPageRoot() {
  return pageRoot;
}

export function getOverlayRoot() {
  return overlayRoot;
}
