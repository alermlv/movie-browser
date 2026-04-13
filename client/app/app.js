import { subscribe, commitState, getState } from "./state/state.js";
import { setupRouter, readRouteFromUrl, renderRoute } from "./router/router.js";
import {
  loadFavorites,
  loadGenresCache,
  loadSearchHistory,
  saveFavorites,
  saveGenresCache,
  saveSearchHistory,
} from "./storage/index.js";
import { mountAppShell } from "./layout/app-shell.js";
import { runMigrations } from "./state/migrations.js";
import { normalizeState } from "./state/normalize-state.js";
import { runRouteEffects } from "./effects/route-effects.js";
import { setupLinkDelegation } from "./router/link-navigation.js";
import { setupOverlayDelegation } from "./overlays/overlay-events.js";
import { renderOverlay } from "./overlays/render-overlay.js";
import { updateScrollLock } from "./layout/scroll-lock.js";

init();

function init() {
  subscribe(handleStateChange);

  mountAppShell();
  hydrateAppState();
  setupRouter();
  setupLinkDelegation();
  setupOverlayDelegation();
  runRouteEffects(getState().route, getState().genres);
}

function hydrateAppState() {
  const loadedState = loadPersistedState();
  const migratedState = runMigrations(loadedState);
  const normalizedState = normalizeState(migratedState);
  const route = readRouteFromUrl();

  commitState((state) => ({
    ...state,
    ...normalizedState,
    route,
    ui: {
      ...state.ui,
      isHydrated: true,
      activeDialog: null,
      error: null,
      notice: null,
    },
  }));
}

function loadPersistedState() {
  return {
    favorites: {
      keys: loadFavorites(),
    },
    genres: loadGenresCache(),
    searchHistory: loadSearchHistory(),
  };
}

function handleStateChange(state) {
  savePersistedState(state);
  renderRoute();
  renderOverlay(state);
  updateScrollLock(state);

  console.log("State changed:", state);
}

function savePersistedState(state) {
  saveFavorites(state.favorites.keys);
  saveGenresCache(state.genres);
  saveSearchHistory(state.searchHistory);
}
