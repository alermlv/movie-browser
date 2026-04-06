import { ROUTES } from "../router/routes.js";
import { loadHomePage } from "./home-actions.js";
import { loadSearchPage } from "./search-actions.js";
import { loadDetailsPage } from "./details-actions.js";
import { loadGenres } from "./genres-actions.js";

let previousRouteKey = "";

export function runRouteEffects(state) {
  const routeKey = createRouteKey(state.route);

  if (routeKey === previousRouteKey) {
    return;
  }

  previousRouteKey = routeKey;

  runPageEffect(state.route);
  runGenresEffect(state.genres);
}

function runPageEffect(route) {
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

  loadGenres();
}

function createRouteKey(route) {
  return JSON.stringify(route);
}
