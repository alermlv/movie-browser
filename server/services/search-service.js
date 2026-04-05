import { getTmdb } from "./tmdb-client.js";
import { normalizeSearchResult } from "../utils/normalize-tmdb.js";

export async function getSearchData(searchParams) {
  const scenario = decideSearchScenario(searchParams);
  const data = await fetchScenarioData(scenario, searchParams);

  return normalizeSearchData(data);
}

function decideSearchScenario(searchParams) {
  if (searchParams.q) {
    return "text-search";
  }

  return "discover";
}

async function fetchScenarioData(scenario, searchParams) {
  if (scenario === "text-search") {
    return fetchTextSearchData(searchParams);
  }

  return fetchDiscoverData(searchParams);
}

async function fetchTextSearchData(searchParams) {
  return getTmdb("/search/multi", {
    query: searchParams.q,
    page: searchParams.page,
  });
}

async function fetchDiscoverData(searchParams) {
  const type = searchParams.type === "tv" ? "tv" : "movie";

  return getTmdb(`/discover/${type}`, {
    page: searchParams.page,
    sort_by: searchParams.sort,
    with_genres: searchParams.genreIds,
    "vote_average.gte": searchParams.ratingFrom,
    "vote_average.lte": searchParams.ratingTo,
    ...(type === "movie"
      ? {
          "primary_release_date.gte": searchParams.yearFrom,
          "primary_release_date.lte": searchParams.yearTo,
        }
      : {
          "first_air_date.gte": searchParams.yearFrom,
          "first_air_date.lte": searchParams.yearTo,
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
