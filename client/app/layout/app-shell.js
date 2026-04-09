import { createNavigation } from "../components/navigation/navigation.js";

let pageRoot = null;

export function mountAppShell() {
  const app = document.getElementById("app");

  if (!app) return;
  
  app.innerHTML = "";

  const header = document.createElement("header");
  const main = document.createElement("main");

  const navigation = createNavigation();

  header.appendChild(navigation);

  app.append(header, main);

  pageRoot = main;
}

export function getPageRoot() {
  return pageRoot;
}
