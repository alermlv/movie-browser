import { navigate, parseRouteFromUrl } from "./router.js";

export function setupLinkDelegation() {
  document.addEventListener("click", handleDocumentClick);
}

function handleDocumentClick(event) {
  if (event.defaultPrevented) return;
  if (event.button !== 0) return;

  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return;
  }

  const link = event.target.closest("a");

  if (!link) return;
  if (link.target && link.target !== "_self") return;
  if (link.hasAttribute("download")) return;

  const href = link.getAttribute("href");

  if (!href || href.startsWith("#")) {
    return;
  }

  const url = new URL(link.href, window.location.origin);

  if (url.origin !== window.location.origin) {
    return;
  }

  const nextPath = `${url.pathname}${url.search}`;
  const currentPath = `${window.location.pathname}${window.location.search}`;

  if (nextPath === currentPath) {
    event.preventDefault();
    return;
  }

  event.preventDefault();
  navigate(parseRouteFromUrl(url));
}
