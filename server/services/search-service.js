import { TMDB_PATHS } from "../config/tmdb-config.js";
import { getTmdb } from "./tmdb-client.js";
import { normalizeSearchResult } from "../utilities/normalize-tmdb.js";

const SEARCH_SCENARIOS = {
  TEXT: "text",
  COLLECTION: "collection",
  DISCOVER: "discover",
};

const SEARCH_COLLECTIONS = {
  trendingMovies: {
    path: TMDB_PATHS.TRENDING_MOVIES,
  },
  trendingTv: {
    path: TMDB_PATHS.TRENDING_TV,
  },
  nowPlayingMovies: {
    path: TMDB_PATHS.NOW_PLAYING_MOVIES,
  },
  onTheAirTv: {
    path: TMDB_PATHS.ON_THE_AIR_TV,
  },
  topRatedMovies: {
    path: TMDB_PATHS.TOP_RATED_MOVIES,
  },
  topRatedTv: {
    path: TMDB_PATHS.TOP_RATED_TV,
  },
  upcomingMovies: {
    path: TMDB_PATHS.UPCOMING_MOVIES,
  },
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

  if (searchParams.collection) {
    return SEARCH_SCENARIOS.COLLECTION;
  }

  return SEARCH_SCENARIOS.DISCOVER;
}

async function fetchScenarioData(scenario, searchParams) {
  if (scenario === SEARCH_SCENARIOS.TEXT) {
    return fetchTextSearchData(searchParams);
  }

  if (scenario === SEARCH_SCENARIOS.COLLECTION) {
    return fetchCollectionData(searchParams);
  }

  return fetchDiscoverData(searchParams);
}

async function fetchTextSearchData(searchParams) {
  return getTmdb("/search/multi", {
    query: String(searchParams.q || ""),
    page: Number(searchParams.page) || 1,
  });
}

async function fetchCollectionData(searchParams) {
  const collectionConfig = SEARCH_COLLECTIONS[searchParams.collection];

  if (!collectionConfig) {
    const error = new Error("Unknown search collection.");
    error.status = 400;
    throw error;
  }

  return getTmdb(collectionConfig.path, {
    page: Number(searchParams.page) || 1,
  });
}

async function fetchDiscoverData(searchParams) {
  const type = searchParams.type === "tv" ? "tv" : "movie";

  return getTmdb(TMDB_PATHS.DISCOVER(type), {
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
