import { getTmdb } from "./tmdb-client.js";
import { normalizeSearchResult } from "../utilities/normalize-tmdb.js";

const SEARCH_SCENARIOS = {
  TEXT: "text",
  DISCOVER: "discover",
};

export async function getSearchData(searchParams) {
  const scenario = decideSearchScenario(searchParams);
  const data = await fetchScenarioData(scenario, searchParams);

  return normalizeSearchData(data);
}

function decideSearchScenario(searchParams) {
  if (searchParams.q) {
    return SEARCH_SCENARIOS.TEXT;
  }

  return SEARCH_SCENARIOS.DISCOVER;
}

async function fetchScenarioData(scenario, searchParams) {
  if (scenario === SEARCH_SCENARIOS.TEXT) {
    return fetchTextSearchData(searchParams);
  }

  return fetchDiscoverData(searchParams);
}

async function fetchTextSearchData(searchParams) {
  return getTmdb("/search/multi", {
    query: String(searchParams.q || ""),
    page: Number(searchParams.page) || 1,
  });
}

async function fetchDiscoverData(searchParams) {
  const type = searchParams.type === "tv" ? "tv" : "movie";

  return getTmdb(`/discover/${type}`, {
    page: Number(searchParams.page) || 1,
    sort_by: searchParams.sort || undefined,
    with_genres: searchParams.genreIds || undefined,
    "vote_average.gte": Number(searchParams.ratingFrom) || undefined,
    "vote_average.lte": Number(searchParams.ratingTo) || undefined,
    ...(type === "movie"
      ? {
          "primary_release_date.gte": searchParams.yearFrom || undefined,
          "primary_release_date.lte": searchParams.yearTo || undefined,
        }
      : {
          "first_air_date.gte": searchParams.yearFrom || undefined,
          "first_air_date.lte": searchParams.yearTo || undefined,
        }),
  });
}

function normalizeSearchData(data) {
  return {
    page: Number(data.page || 1),
    totalPages: Number(data.total_pages || 0),
    totalResults: Number(data.total_results || 0),
    items: (data.results || []).map(normalizeSearchResult).filter(Boolean),
  };
}
