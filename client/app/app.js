import { subscribe, commitState } from "./state/state.js";
import { setupRouter, renderRoute } from "./router/router.js";
import {
  loadFavorites,
  loadGenresCache,
  loadSearchHistory,
  saveFavorites,
  saveGenresCache,
  saveSearchHistory,
} from "./storage/storage.js";

init();

function init() {
  subscribe(handleStateChange);

  hydrateAppState();
  setupRouter();
}

function hydrateAppState() {
  const loadedState = loadPersistedState();

  commitState((state) => ({
    ...state,
    ...loadedState,
    ui: {
      ...state.ui,
      isHydrated: true,
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
