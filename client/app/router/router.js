import { ROUTES } from "./routes.js";
import { commitState, getState } from "../state/state.js";

export function setupRouter() {
  syncRouteWithUrl();
  window.addEventListener("popstate", syncRouteWithUrl);
}

export function navigate(route) {
  const url = buildUrl(route);

  window.history.pushState({}, "", url);
  syncRouteWithUrl();
  resetTransientUiState();
}

export function renderRoute() {
  const app = document.getElementById("app");

  if (!app) {
    return;
  }

  const { route } = getState();

  app.innerHTML = `<h1>${route.name}</h1>`;
}

function syncRouteWithUrl() {
  const url = new URL(window.location.href);
  const route = parseRouteFromUrl(url);

  commitState((state) => ({
    ...state,
    route,
  }));
}

function parseRouteFromUrl(url) {
  if (url.pathname === "/" || url.pathname === "/home") {
    return createHomeRoute();
  }

  if (url.pathname === "/search") {
    return {
      name: ROUTES.SEARCH,
      params: {},
      query: Object.fromEntries(url.searchParams.entries()),
    };
  }

  if (url.pathname === "/favorites") {
    return {
      name: ROUTES.FAVORITES,
      params: {},
      query: Object.fromEntries(url.searchParams.entries()),
    };
  }

  if (url.pathname === "/details") {
    return {
      name: ROUTES.DETAILS,
      params: {},
      query: Object.fromEntries(url.searchParams.entries()),
    };
  }

  if (url.pathname.startsWith("/movie/")) {
    const parts = url.pathname.split("/").filter(Boolean);

    if (parts.length === 2) {
      return {
        name: ROUTES.DETAILS,
        params: {
          type: "movie",
          id: parts[1],
        },
        query: {},
      };
    }
  }

  if (url.pathname.startsWith("/tv/")) {
    const parts = url.pathname.split("/").filter(Boolean);

    if (parts.length === 2) {
      return {
        name: ROUTES.DETAILS,
        params: {
          type: "tv",
          id: parts[1],
        },
        query: {},
      };
    }
  }

  return createHomeRoute();
}

function createHomeRoute() {
  return {
    name: ROUTES.HOME,
    params: {},
    query: {},
  };
}

function resetTransientUiState() {
  commitState((state) => ({
    ...state,
    ui: {
      ...state.ui,
      activeDialog: null,
      error: null,
      notice: null,
    },
  }));
}

function buildUrl(route) {
  if (route.name === ROUTES.HOME) {
    return "/";
  }

  if (route.name === ROUTES.SEARCH) {
    const search = new URLSearchParams(route.query).toString();
    return search ? `/search?${search}` : "/search";
  }

  if (route.name === ROUTES.DETAILS) {
    const { type, id } = route.params;

    if (type === "movie" && id) {
      return `/movie/${encodeURIComponent(id)}`;
    }

    if (type === "tv" && id) {
      return `/tv/${encodeURIComponent(id)}`;
    }

    const search = new URLSearchParams(route.query).toString();
    return search ? `/details?${search}` : "/details";
  }

  if (route.name === ROUTES.FAVORITES) {
    const search = new URLSearchParams(route.query).toString();
    return search ? `/favorites?${search}` : "/favorites";
  }

  return "/";
}
