import { ROUTES } from "../router/routes.js";
import {
  loadDetailsPage,
  loadHomePage,
  loadSearchPage,
} from "./page-effects.js";
import { loadGenres } from "./genres-effects.js";

let previousRouteKey = "";
let isGenresLoading = false;

export function runRouteEffects(route, genres) {
  runPageEffect(route);
  runGenresEffect(genres);
}

function runPageEffect(route) {
  const routeKey = JSON.stringify(route);

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

function runGenresEffect(genres) {
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
