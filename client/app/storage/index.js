import { STORAGE_KEYS } from "./config/config.js";

export function loadFavorites() {
  return load(STORAGE_KEYS.FAVORITES, []);
}

export function saveFavorites(keys) {
  save(STORAGE_KEYS.FAVORITES, keys);
}

export function loadGenresCache() {
  return load(STORAGE_KEYS.GENRES, {
    byType: {
      movie: {},
      tv: {},
    },
  });
}

export function saveGenresCache(genres) {
  save(STORAGE_KEYS.GENRES, genres);
}

export function loadSearchHistory() {
  return load(STORAGE_KEYS.SEARCH_HISTORY, []);
}

export function saveSearchHistory(history) {
  save(STORAGE_KEYS.SEARCH_HISTORY, history);
}

function load(key, fallbackValue) {
  try {
    const rawValue = localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallbackValue;
  } catch {
    return fallbackValue;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}
