import { ROUTES } from "../router/routes.js";
import { loadHomePage } from "./page/home-effect.js";
import { loadSearchPage } from "./page/search-effect.js";
import { loadDetailsPage } from "./page/details-effect.js";
import { loadGenres } from "./genres-effects.js";

let previousRouteKey = "";
let isGenresLoading = false;

export function runRouteEffects(route, genres) {
  runPageEffect(route);
  ensureGenresLoaded(genres);
}

function runPageEffect(route) {
  const routeKey = getRouteKey(route);

  if (routeKey === previousRouteKey) {
    return;
  }

  previousRouteKey = routeKey;

  if (route.name === ROUTES.HOME) {
    loadHomePage();
    return;
  }

  if (route.name === ROUTES.SEARCH) {
    loadSearchPage(route);
    return;
  }

  if (route.name === ROUTES.DETAILS) {
    loadDetailsPage(route);
  }
}

function ensureGenresLoaded(genres) {
  const hasMovieGenres = Object.keys(genres.byType.movie).length > 0;
  const hasTvGenres = Object.keys(genres.byType.tv).length > 0;

  if (hasMovieGenres && hasTvGenres) {
    return;
  }

  if (isGenresLoading) {
    return;
  }

  isGenresLoading = true;

  loadGenres().finally(() => {
    isGenresLoading = false;
  });
}

function getRouteKey(route) {
  return `${route.name}|${JSON.stringify(route.params)}|${JSON.stringify(route.query)}`;
}
