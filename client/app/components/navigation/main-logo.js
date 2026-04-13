const SVG_NS = "http://www.w3.org/2000/svg";

export function createMainLogo() {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.classList.add("main-logo");

  const use = document.createElementNS(SVG_NS, "use");
  use.setAttribute("href", "/assets/icons/main-logo.svg#main-logo");

  svg.appendChild(use);

  return svg;
}
