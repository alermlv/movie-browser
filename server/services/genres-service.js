import { getTmdb } from "./tmdb-client.js";
import { normalizeGenresMap } from "../utilities/normalize-tmdb.js";

export async function getGenresData(genresParams) {
  if (genresParams.type === "all") {
    return fetchAllGenres();
  }

  return fetchGenresByType(genresParams.type);
}

async function fetchAllGenres() {
  const [movieData, tvData] = await Promise.all([
    getTmdb("/genre/movie/list"),
    getTmdb("/genre/tv/list"),
  ]);

  return {
    byType: {
      movie: normalizeGenresMap(movieData.genres || []),
      tv: normalizeGenresMap(tvData.genres || []),
    },
  };
}

async function fetchGenresByType(type) {
  const data = await getTmdb(`/genre/${type}/list`);

  return {
    byType: {
      movie: type === "movie" ? normalizeGenresMap(data.genres || []) : {},
      tv: type === "tv" ? normalizeGenresMap(data.genres || []) : {},
    },
  };
}
