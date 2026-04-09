const SVG_NS = "http://www.w3.org/2000/svg";

export function createIcon(icon) {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.classList.add("icon");

  const use = document.createElementNS(SVG_NS, "use");
  use.setAttribute("href", `/assets/icons/sprite.svg#${icon}`);

  svg.appendChild(use);

  return svg;
}
