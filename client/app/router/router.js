import { ROUTES } from "./routes.js";
import { commitState, getState } from "../state/state.js";
import { runRouteEffects } from "../actions/route-effects.js";

export function setupRouter() {
  window.addEventListener("popstate", syncRouteWithUrl);
}

export function navigate(route) {
  const url = buildUrl(route);

  window.history.pushState({}, "", url);
  syncRouteWithUrl();
}

export function renderRoute() {
  const app = document.getElementById("app");

  if (!app) {
    return;
  }

  const { route } = getState();

  app.innerHTML = `<h1>${route.name}</h1>`;
}

export function readRouteFromUrl() {
  const url = new URL(window.location.href);
  return parseRouteFromUrl(url);
}

function syncRouteWithUrl() {
  const route = readRouteFromUrl();

  commitState((state) => ({
    ...state,
    route,
    ui: {
      ...state.ui,
      activeDialog: null,
      error: null,
      notice: null,
    },
  }));

  const state = getState();
  runRouteEffects(state.route, state.genres);
}

function parseRouteFromUrl(url) {
  if (url.pathname === "/") {
    return {
      name: ROUTES.HOME,
      params: {},
      query: {},
    };
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

  return {
    name: ROUTES.HOME,
    params: {},
    query: {},
  };
}

function buildUrl(route) {
  if (route.name === ROUTES.HOME) {
    return "/";
  }

  if (route.name === ROUTES.SEARCH) {
    const search = new URLSearchParams(route.query).toString();
    return search ? `/search?${search}` : "/search";
  }

  if (route.name === ROUTES.FAVORITES) {
    const search = new URLSearchParams(route.query).toString();
    return search ? `/favorites?${search}` : "/favorites";
  }

  if (route.name === ROUTES.DETAILS) {
    const { type, id } = route.params;

    if (type === "movie" && id) {
      return `/movie/${encodeURIComponent(id)}`;
    }

    if (type === "tv" && id) {
      return `/tv/${encodeURIComponent(id)}`;
    }
  }

  return "/";
}
