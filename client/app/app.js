import { subscribe, commitState, getState } from "./state/state.js";
import { setupRouter, readRouteFromUrl, renderRoute } from "./router/router.js";
import {
  loadFavorites,
  loadGenresCache,
  loadSearchHistory,
  saveFavorites,
  saveGenresCache,
  saveSearchHistory,
} from "./storage/storage.js";
import { mountAppShell } from "./layout/app-shell.js";
import { runMigrations } from "./state/migrations.js";
import { normalizeState } from "./state/normalize-state.js";
import { runRouteEffects } from "./actions/route-effects.js";

init();

function init() {
  subscribe(handleStateChange);

  mountAppShell();

  hydrateAppState();
  setupRouter();
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

  console.log("State changed:", state);
}

function savePersistedState(state) {
  saveFavorites(state.favorites.keys);
  saveGenresCache(state.genres);
  saveSearchHistory(state.searchHistory);
}
