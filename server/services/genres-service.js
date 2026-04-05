import { getTmdb } from "./tmdb-client.js";

export async function getGenresData(genresParams) {
  const type = genresParams.type || "all";

  if (type === "all") {
    return fetchAllGenres();
  }

  return fetchGenresByType(type);
}

async function fetchAllGenres() {
  const [movieData, tvData] = await Promise.all([
    getTmdb("/genre/movie/list"),
    getTmdb("/genre/tv/list"),
  ]);

  return {
    byType: {
      movie: movieData.genres || [],
      tv: tvData.genres || [],
    },
  };
}

async function fetchGenresByType(type) {
  const data = await getTmdb(`/genre/${type}/list`);

  return {
    byType: {
      [type]: data.genres || [],
    },
  };
}
